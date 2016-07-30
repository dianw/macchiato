const dbEnv = require('../../env.js').db;
const Sequelize = require('sequelize');

const dbOpts = {
	define: {
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		//prevent sequelize from pluralizing table names
		freezeTableName: true,
		underscored: true
	},
	dialect: dbEnv.dialect,
	pool: {
		max: 10,
		min: 1,
		idle: 10000
	}
};

let sequelize;

if (dbEnv.uri) {
	sequelize = new Sequelize(dbEnv.uri, dbOpts);
} else {
	dbOpts.host = dbEnv.host;
	dbOpts.port = dbEnv.port;
	sequelize = new Sequelize(dbEnv.name, dbEnv.username, dbEnv.password, dbOpts);
}

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
})
.catch(err => {
	console.log('Unable to connect to the database:', err);
});

module.exports = sequelize;
