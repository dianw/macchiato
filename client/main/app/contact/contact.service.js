(() => {
	'use strict';

	angular.module('es').factory('RestContactService', function(Restangular) {
		return Restangular.service('contacts');
	});
})();
