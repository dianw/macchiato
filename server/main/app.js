const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

//initialize database and run migration
require('./core/config/db');
require('./core/config/db.migration');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use((err, req, res, next) => {
	console.log('interceptor');
	next();
});

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

app.listen(3000, () => {
	console.log('Application initialized');
});
