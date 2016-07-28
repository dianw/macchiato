(() => {
	'use strict';

	angular.module('es').controller('ContactListCtrl', function(Restangular) {
		const contactService = Restangular.service('contacts');
		const ctrl = this;
		ctrl.delete = deleteContact;

		loadContacts();

		function loadContacts() {
			contactService.getList().then((contacts) => {
				ctrl.contacts = contacts;
			});
		}

		function deleteContact(contact) {
			contact.remove().then(() => {
				loadContacts();
			});
		}
	});
})();
