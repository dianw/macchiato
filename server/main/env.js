const env = {
	dev: {
		name: 'dev',
		db: {
			dialect: 'mysql',
			host: 'localhost',
			name: 'express_starter',
			password: 'root',
			port: 3306,
			username: 'root'
		},
		server: {
			port: 3000
		}
	},
	prod: {
	}
};

module.exports = env[process.env.NODE_ENV || 'prod'];
