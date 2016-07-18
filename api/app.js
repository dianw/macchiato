const express = require('express');
const session = require('express-session')

const app = express();

// app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'random af',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// routers
require('./ping/ping.router')(app);

app.listen(3000, () => {
  console.log('Application initialized');
});
