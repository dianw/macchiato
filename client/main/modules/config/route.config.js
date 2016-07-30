(() => {
	'use strict';

	angular.module('es').config(routeConfig);

	function routeConfig($locationProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');

		$urlRouterProvider.otherwise('/backend/contacts');

		$urlMatcherFactoryProvider.strictMode(false);
	}
})();
