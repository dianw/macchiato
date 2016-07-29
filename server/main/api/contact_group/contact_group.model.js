const Sequelize = require('sequelize');
const Contact = require('../contact/contact.model');
const Group = require('../group/group.model');
const db = require('../../core/config/db');

const ContactGroup = db.define('contact_group', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	createdAt: {
		type: Sequelize.DATE,
		field: 'created_at'
	},
	updatedAt: {
		type: Sequelize.DATE,
		field: 'updated_at'
	}
});

ContactGroup.belongsTo(Contact);
ContactGroup.belongsTo(Group);

module.exports = ContactGroup;
