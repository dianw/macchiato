const mailEnv = require('../../env.js').mail;
const nodemailer = require('nodemailer');

module.export = nodemailer.createTransport(mailEnv.smtp);
