const express = require('express');
const router = express.Router();
const Contact = require('./contact.model');

router.get('/', (req, res) => {
	Contact.findAndCountAll()
		.then(contacts => res.send(contacts))
		.error(e => res.send(e));
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
	});
});

router.post('/', (req, res) => {
	const contact = req.body;
	contact.createdAt = new Date();
	contact.updatedAt = new Date();

	Contact.create(contact).then(c => {
		res.json(c.dataValues);
	}).error(e => res.json(e));
});

router.put('/:id', (req, res) => {
	const contact = req.body;

	Contact.findById(req.params.id).then(c => {
		if (c) {
			c.update({
				name: contact.name,
				phone: contact.phone,
				email: contact.email,
				updatedAt: new Date()
			}).then(c => res.send(c));
		} else {
			res.status(400).send({
				message: `No contact found with id: ${req.params.id}`
			});
		}
	});
});

module.exports = router;
