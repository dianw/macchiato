(() => {
	'use strict';

	angular.module('es').config(($stateProvider) => {
		$stateProvider.state('mail-list', {
			url: '/backend/mails',
			controller: 'MailListCtrl as ctrl',
			templateUrl: 'app/mail/mail.list.html'
		}).state('mail-form', {
			url: '/backend/mails/:id',
			controller: 'MailFormCtrl as ctrl',
			templateUrl: 'app/mail/mail.form.html'
		}).state('mail-contact-list', {
			url: '/backend/mails/:id/contacts?q',
			controller: 'MailContactListCtrl as ctrl',
			templateUrl: 'app/mail/mail.contact.list.html'
		});
	});
})();
