const promise = require('bluebird');

promise.config({
	cancellation: true
});

module.exports = promise;
