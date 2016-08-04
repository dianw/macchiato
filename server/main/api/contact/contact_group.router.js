const express = require('express');
const _ = require('lodash');

const model = require('../../core/config/db');
const Group = model.Group,
	ContactGroup = model.ContactGroup;

const router = express.Router();

router.get('/:id/groups', (req, res) => {
	const limit = _.defaultTo(req.query.max, 10);
	const offset = _.defaultTo(req.query.offset, 0);
	const q = _.toString(req.query.q);

	ContactGroup.findAndCountAll({
		include: [ Group ],
		where: {
			'contact_id': req.params.id
		},
		limit: _.toInteger(limit),
		offset: _.toInteger(offset)
	}).then(contactGroups => {
		contactGroups.rows = _.map(contactGroups.rows, cg => cg.Group);

		res.send(contactGroups);
	}).catch(e => res.status(500).send(e));
});

router.post('/:id/groups', (req, res) => {
	const contactGroup = {
		contact_id: req.params.id,
		group_id: req.body.id
	};

	ContactGroup.create(contactGroup).then(c => {
		res.json(c.dataValues);
	}).catch(e => res.status(500).send(e));
});

module.exports = router;
