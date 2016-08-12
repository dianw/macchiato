(() => {
	'use strict';

	angular.module('es').factory('RestMailService', function(Restangular) {
		return Restangular.service('mails');
	});
})();
