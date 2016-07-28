(() => {
	'use strict';

	angular.module('es').config(($stateProvider, $urlRouterProvider) => {
		$urlRouterProvider.otherwise('/contacts');

		$stateProvider.state('contact-list', {
			url: '/contacts',
			controller: 'ContactListCtrl as ctrl',
			templateUrl: 'app/contact/contact.list.html'
		}).state('contact-form', {
			url: '/contacts/:id',
			controller: 'ContactFormCtrl as ctrl',
			templateUrl: 'app/contact/contact.form.html'
		});
	});
})();
