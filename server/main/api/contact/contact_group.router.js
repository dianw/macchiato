const express = require('express');
const _ = require('lodash');

const model = require('../../core/config/db');
const Group = model.Group,
	ContactGroup = model.ContactGroup;

const router = express.Router();

router.get('/:id/groups', (req, res) => {
	ContactGroup.findAndCountAll({
		include: [ Group ],
		where: {
			'contact_id': req.params.id
		}
	})
		.then(contactGroups => {
			contactGroups.rows = _.map(contactGroups.rows, cg => cg.group);

			res.send(contactGroups);
		})
		.error(e => res.status(500).send(e));
});

router.post('/:id/groups', (req, res) => {
	ContactGroup.findAndCountAll({
		include: [ Group ],
		where: {
			'contact_id': req.params.id
		}
	})
		.then(contactGroups => {
			contactGroups.rows = _.map(contactGroups.rows, cg => cg.group);

			res.send(contactGroups);
		})
		.error(e => res.status(500).send(e));
});

module.exports = router;
