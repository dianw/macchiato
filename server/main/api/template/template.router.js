const express = require('express');
const _ = require('lodash');
const Template = require('../../core/config/db').Template;

const router = express.Router();

router.get('/', (req, res) => {
	const limit = _.defaultTo(req.query.max, 10);
	const offset = _.defaultTo(req.query.offset, 0);
	const q = _.toString(req.query.q);

	Template.findAndCountAll({
		where: {
			$or: {
				title: { $like: _.join(['%', q, '%'], '') },
				template: { $like: _.join(['%', q, '%'], '') }
			}
		},
		limit: _.toInteger(limit),
		offset: _.toInteger(offset)
	})
		.then(templates => res.send(templates))
		.catch(e => res.status(500).send(e));
});

router.get('/:id', (req, res) => {
	Template.findById(req.params.id).then(c => {
		if (c) {
			res.send(c);
		} else {
			res.status(400).send({
				message: `No template found with id: ${req.params.id}`
			});
		}
	}).catch(e => res.status(500).send(e));
});

router.post('/', (req, res) => {
	const template = req.body;

	Template.create(template).then(c => {
		res.json(c.dataValues);
	}).catch(e => res.status(500).send(e));
});

router.put('/:id', (req, res) => {
	const template = req.body;

	Template.findById(req.params.id).then(c => {
		if (c) {
			c.update({
				title: template.title,
				template: template.template,
			}).then(c => res.send(c));
		} else {
			res.status(400).send({
				message: `No template found with id: ${req.params.id}`
			});
		}
	}).catch(e => res.status(500).send(e));
});

router.delete('/:id', (req, res) => {
	Template.destroy({
		where: { id: req.params.id }
	}).then(() => {
		res.status(204).end();
	}).catch(e => res.status(500).send(e));
});

module.exports = router;
