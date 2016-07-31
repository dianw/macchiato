const express = require('express');
const _ = require('lodash');
const Contact = require('../../core/config/db').Contact;

const router = express.Router();

router.get('/', (req, res) => {
	const limit = _.defaultTo(req.query.max, 10);
	const offset = _.defaultTo(req.query.offset, 0);
	const q = _.toString(req.query.q);

	Contact.findAndCountAll({
		where: {
			$or: {
				name: { $like: _.join(['%', q, '%'], '') },
				phone: { $like: _.join(['%', q, '%'], '') },
				email: { $like: _.join(['%', q, '%'], '') }
			}
		},
		limit: _.toInteger(limit),
		offset: _.toInteger(offset)
	})
		.then(contacts => res.send(contacts))
		.catch(e => res.status(500).send(e));
});

router.get('/:id', (req, res) => {
	Contact.findById(req.params.id).then(c => {
		if (c) {
			res.send(c);
		} else {
			res.status(400).send({
				message: `No contact found with id: ${req.params.id}`
			});
		}
	}).catch(e => res.status(500).send(e));
});

router.post('/', (req, res) => {
	const contact = req.body;

	Contact.create(contact).then(c => {
		res.json(c.dataValues);
	}).catch(e => res.status(500).send(e));
});

router.put('/:id', (req, res) => {
	const contact = req.body;

	Contact.findById(req.params.id).then(c => {
		if (c) {
			c.update({
				name: contact.name,
				phone: contact.phone,
				email: contact.email,
				address: contact.address
			}).then(c => res.send(c));
		} else {
			res.status(400).send({
				message: `No contact found with id: ${req.params.id}`
			});
		}
	}).catch(e => res.status(500).send(e));
});

router.delete('/:id', (req, res) => {
	Contact.destroy({
		where: { id: req.params.id }
	}).then(() => {
		res.status(204).end();
	}).catch(e => res.status(500).send(e));
});

module.exports = router;
