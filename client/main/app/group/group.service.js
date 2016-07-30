(() => {
	'use strict';

	angular.module('es').factory('RestGroupService', function(Restangular) {
		return Restangular.service('groups');
	});
})();
