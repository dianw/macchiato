(() => {
	'use strict';

	angular.module('es').config(($stateProvider, $urlRouterProvider) => {
		$urlRouterProvider.otherwise('/backend/contacts');

		$stateProvider.state('contact-list', {
			url: '/backend/contacts',
			controller: 'ContactListCtrl as ctrl',
			templateUrl: 'app/contact/contact.list.html'
		}).state('contact-form', {
			url: '/backend/contacts/:id',
			controller: 'ContactFormCtrl as ctrl',
			templateUrl: 'app/contact/contact.form.html'
		});
	});
})();
