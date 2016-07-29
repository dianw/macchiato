const express = require('express');
const _ = require('lodash');
const Group = require('./group.model');

const router = express.Router();

router.get('/', (req, res) => {
	const limit = _.defaultTo(req.query.max, 10);
	const offset = _.defaultTo(req.query.offset, 0);
	const q = _.toString(req.query.q);

	Group.findAndCountAll({
		where: {
			$or: {
				name: { $like: _.join(['%', q, '%'], '') },
				description: { $like: _.join(['%', q, '%'], '') }
			}
		},
		limit: _.toInteger(limit),
		offset: _.toInteger(offset)
	})
		.then(groups => res.send(groups))
		.error(e => res.send(e));
});

router.get('/:id', (req, res) => {
	Group.findById(req.params.id).then(c => {
		if (c) {
			res.send(c);
		} else {
			res.status(400).send({
				message: `No group found with id: ${req.params.id}`
			});
		}
	});
});

router.post('/', (req, res) => {
	const group = req.body;

	Group.create(group).then(c => {
		res.json(c.dataValues);
	}).error(e => res.json(e));
});

router.put('/:id', (req, res) => {
	const group = req.body;

	Group.findById(req.params.id).then(c => {
		if (c) {
			c.update({
				name: group.name,
				description: group.description
			}).then(c => res.send(c));
		} else {
			res.status(400).send({
				message: `No group found with id: ${req.params.id}`
			});
		}
	});
});

router.delete('/:id', (req, res) => {
	Group.destroy({
		where: { id: req.params.id }
	}).then(() => {
		res.status(204).end();
	});
});

module.exports = router;
