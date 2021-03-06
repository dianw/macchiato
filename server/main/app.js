const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

// environment
const env = require('./env');

// initialize promise configuration
require('./core/config/promise');

// initialize database and run migration
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

// api endpoints
app.use('/api/contacts', require('./api/contact/contact.router'));
app.use('/api/contacts', require('./api/contact/contact_group.router'));
app.use('/api/groups', require('./api/group/group.router'));
app.use('/api/groups', require('./api/group/group_contact.router'));
app.use('/api/templates', require('./api/template/template.router'));
app.use('/api/mails', require('./api/mail/mail.router'));

app.all('/api/*', (req, res) => {
	res.status(404).end();
});

if (env.name === 'dev') {
	app.use('/bower_components', express.static(path.resolve('bower_components')));
	app.use('/styles', express.static(path.resolve('client/tmp/styles')));
	app.use('/', express.static(path.resolve('client/main')));

	app.all('/*', (req, res) => {
		res.sendFile(path.resolve('client/main/index.html'));
	});
} else {
	app.use('/', express.static(path.resolve('client/dist')));

	app.all('/*', (req, res) => {
		res.sendFile(path.resolve('client/dist/index.html'));
	});
}

app.listen(env.server.port, () => {
	console.log('Application initialized');
});
