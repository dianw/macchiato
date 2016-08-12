const express = require('express');
const mustache = require('mustache');
const _ = require('lodash');
const mailer = require('../../core/config/email');
const model = require('../../core/config/db'),
	Contact = model.Contact,
	ContactGroup = model.ContactGroup,
	Group = model.Group,
	Mail = model.Mail,
	MailStatus = model.MailStatus,
	Template = model.Template;

const router = express.Router();

router.get('/', (req, res) => {
	const limit = _.defaultTo(req.query.max, 10);
	const offset = _.defaultTo(req.query.offset, 0);

	Mail.findAndCountAll({
		include: [ Group, Template ],
		limit: _.toInteger(limit),
		offset: _.toInteger(offset)
	})
		.then(mails => res.send(mails))
		.catch(e => res.status(500).send(e));
});

router.get('/:id', (req, res) => {
	Mail.findById(req.params.id).then(c => {
		if (c) {
			res.send(c);
		} else {
			res.status(400).send({
				message: `No mail found with id: ${req.params.id}`
			});
		}
	}).catch(e => res.status(500).send(e));
});

router.get('/:id/statuses', (req, res) => {
	const limit = _.defaultTo(req.query.max, 10);
	const offset = _.defaultTo(req.query.offset, 0);

	MailStatus.findAndCountAll({
		where: {
			mail_id: req.params.id
		},
		limit: _.toInteger(limit),
		offset: _.toInteger(offset)
	})
		.then(mails => res.send(mails))
		.catch(e => res.status(500).send(e));
});

router.post('/', (req, res) => {
	const mail = req.body;

	const p = Template.findById(mail.template.id).then(template => { // find template by ID
		if (template) {
			mail.template = template;
			mail.template_id = template.id;

			return template;
		} else {
			res.status(400).send({
				message: `No template found with id: ${mail.template.id}`
			});

			p.cancel();
		}
	}).then(() => {
		return ContactGroup.findAndCountAll({ // if template found find contacts by group's ID
			include: [ Contact ],
			where: {
				'group_id': mail.group.id
			}
		}).then(contactGroups => {
			if (contactGroups.count < 1) {
				res.status(400).send({
					message: `No contacts found with group id: ${mail.group.id}`
				});

				p.cancel();
			}

			return _.map(contactGroups.rows, cg => cg.Contact);
		});
	}).then(contacts => { // save mail
		mail.group_id = mail.group.id;

		return Mail.create(mail).then(m => {
			return {
				mail: m,
				group: mail.group,
				contacts: contacts
			};
		});
	}).then(mailContacts => { // send email to each contacts
		const template = mail.template,
			contacts = mailContacts.contacts;

		contacts.forEach(contact => {
			mailer.sendMailAsync({
				from: '"Admin" <admin@example.com>',
				to: `"${contact.name}" <${contact.email}>`,
				subject: template.title,
				html: mustache.render(template.template, contact)
			}).then(info => {
				const mailStatus = {
					contact_id: contact.id,
					mail_id: mailContacts.mail.id,
					messageId: info.messageId,
					response: info.response
				};

				if (info.accepted.length > 0) {
					mailStatus.status = 'ACCEPTED';
				} else if (info.rejected.length > 0) {
					mailStatus.status = 'REJECTED';
				} else if (info.pending.length > 0) {
					mailStatus.status = 'PENDING';
				}

				MailStatus.create(mailStatus).catch(e => console.err(e));
			}).catch((e) => {
				console.err(e);
			});
		});

		res.send(mailContacts);
	}).catch(e => res.status(500).send(e));
});

module.exports = router;
