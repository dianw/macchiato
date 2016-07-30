const _ = require('lodash');
const argv = require('minimist')(process.argv.slice(2));

const env = {
	dev: {
		name: 'dev',
		db: {
			host: 'localhost',
			port: 3306,
			name: 'macchiato',
			dialect: 'mysql',
			username: 'root',
			password: 'root'
		},
		mail: {
			smtp: {
				host: 'mailtrap.io',
				port: 2525,
				auth: {
					user: '0e492b2fecd149',
					pass: 'f7d7283d053ce8'
				},
				pool: true,
				secure: true
			}
		},
		server: {
			port: 3000
		}
	},
	prod: {
		name: 'prod',
		db: {
			host: 'localhost',
			port: 3306,
			name: 'macchiato',
			dialect: 'mysql',
			username: 'root',
			password: 'root'
		},
		mail: {
			smtp: {
				host: 'mailtrap.io',
				port: 2525,
				auth: {
					user: '0e492b2fecd149',
					pass: 'f7d7283d053ce8'
				},
				pool: true,
				secure: true
			}
		},
		server: {
			port: 8080
		}
	}
};

const activeEnvName = _.defaultTo(argv.profile, 'dev');
const activeEnv = _.defaultsDeep(argv, env[activeEnvName]);

module.exports = activeEnv;
