const Sequelize = require('sequelize');
const db = require('../core/config/db');

module.exports = db.define('contact', {
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
	},
	name: {
		type: Sequelize.STRING
	},
	phone: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	}
});
