const Umzug = require('umzug');
const db = require('./db');

const umzug = new Umzug({
	storage: 'sequelize',

	storageOptions: {
		sequelize: db,
	},

	migrations: {
		params: [db.getQueryInterface(), db.constructor, () => {
			throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
		}],
		path: './server/main/core/config/db_migrations',
		pattern: /\.js$/
	}

});

umzug.up().then(() =>  {
	console.log('Migration complete!');
});

module.exports = umzug;
