const express = require('express');
const _ = require('lodash');

const model = require('../../core/config/db');
const Contact = model.Contact,
	ContactGroup = model.ContactGroup;

const router = express.Router();

router.get('/:id/contacts', (req, res) => {
	const limit = _.defaultTo(req.query.max, 10);
	const offset = _.defaultTo(req.query.offset, 0);
	const q = _.toString(req.query.q);

	ContactGroup.findAndCountAll({
		include: [{
			model: Contact,
			where: {
				$or: {
					name: { $like: _.join(['%', q, '%'], '') },
					email: { $like: _.join(['%', q, '%'], '') }
				}
			}
		}],
		where: {
			'group_id': req.params.id
		},
		limit: _.toInteger(limit),
		offset: _.toInteger(offset)
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

router.delete('/:id/contacts/:cid', (req, res) => {
	const contactGroup = {
		contact_id: req.params.cid,
		group_id: req.params.id
	};

	ContactGroup.destroy({
		where: contactGroup
	}).then(c => {
		res.json(c.dataValues);
	}).catch(e => res.status(500).send(e));
});

module.exports = router;
