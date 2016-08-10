(() => {
	'use strict';

	angular.module('es').factory('RestTemplateService', function(Restangular) {
		return Restangular.service('templates');
	});
})();
