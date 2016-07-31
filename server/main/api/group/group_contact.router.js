const express = require('express');
const _ = require('lodash');

const model = require('../../core/config/db');
const Contact = model.Contact,
	ContactGroup = model.ContactGroup;

const router = express.Router();

router.get('/:id/contacts', (req, res) => {
	ContactGroup.findAndCountAll({
		include: [ Contact ],
		where: {
			'group_id': req.params.id
		}
	}).then(contactGroups => {
		contactGroups.rows = _.map(contactGroups.rows, cg => cg.Contact);

		res.send(contactGroups);
	}).catch(e => res.status(500).send(e));
});

router.post('/:id/contacts', (req, res) => {
	const contactGroup = {
		contact_id: req.body.id,
		group_id: req.params.id
	};

	ContactGroup.create(contactGroup).then(c => {
		res.json(c.dataValues);
	}).catch(e => res.status(500).send(e));
});

module.exports = router;
