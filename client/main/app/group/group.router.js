(() => {
	'use strict';

	angular.module('es').config(($stateProvider) => {
		$stateProvider.state('group-list', {
			url: '/backend/groups',
			controller: 'GroupListCtrl as ctrl',
			templateUrl: 'app/group/group.list.html'
		}).state('group-form', {
			url: '/backend/groups/:id',
			controller: 'GroupFormCtrl as ctrl',
			templateUrl: 'app/group/group.form.html'
		}).state('group-contact-list', {
			url: '/backend/groups/:id/contacts?q',
			controller: 'GroupContactListCtrl as ctrl',
			templateUrl: 'app/group/group.contact.list.html'
		});
	});
})();
