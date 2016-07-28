const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

// environment
const env = require('./env');

//initialize database and run migration
require('./core/config/db');
require('./core/config/db.migration');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// activate session
app.use(session({
	secret: 'random af',
	resave: false,
	saveUninitialized: true,
	store: new session.MemoryStore(),
	cookie: {
		maxAge: 24 * 60 * 60 * 1000,
		secure: false
	}
}));

app.use('/api/contacts', require('./contact/contact.router'));

if (env.name === 'dev') {
	app.use('/bower_components', express.static(path.resolve('bower_components')));
	app.use('/styles', express.static(path.resolve('client/tmp/styles')));
	app.use('/', express.static(path.resolve('client/main')));

	app.all('/*', (req, res) => {
		res.sendFile(path.resolve('client/main/index.html'));
	});
}

app.listen(env.server.port, () => {
	console.log('Application initialized');
	console.log(__dirname + '/../../client/main');
});
