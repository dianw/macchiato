const mailEnv = require('../../env.js').mail;
const nodemailer = require('nodemailer'),
	smtpPool = require('nodemailer-smtp-pool'),
	promise = require('bluebird');

module.exports = promise.promisifyAll(nodemailer.createTransport(smtpPool(mailEnv.smtp)));
