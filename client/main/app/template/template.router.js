(() => {
	'use strict';

	angular.module('es').config(($stateProvider) => {
		$stateProvider.state('template-list', {
			url: '/backend/templates',
			controller: 'TemplateListCtrl as ctrl',
			templateUrl: 'app/template/template.list.html'
		}).state('template-form', {
			url: '/backend/templates/:id',
			controller: 'TemplateFormCtrl as ctrl',
			templateUrl: 'app/template/template.form.html'
		}).state('template-contact-list', {
			url: '/backend/templates/:id/contacts?q',
			controller: 'TemplateContactListCtrl as ctrl',
			templateUrl: 'app/template/template.contact.list.html'
		});
	});
})();
