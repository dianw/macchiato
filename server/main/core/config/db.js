const env = require('../../env.json')[process.env.NODE_ENV || 'prod'];
const db = env.db;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(db.name, db.username, db.password, {
	define: {
		//prevent sequelize from pluralizing table names
		freezeTableName: true,
		timestamps: false
	},
	dialect: db.dialect,
	host: db.host,
	pool: {
		max: 10,
		min: 1,
		idle: 10000
	},
	port: db.port
});

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
})
.catch(err => {
	console.log('Unable to connect to the database:', err);
});

module.exports = sequelize;
