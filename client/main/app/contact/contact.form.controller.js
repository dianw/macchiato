(() => {
	'use strict';

	angular.module('es').controller('ContactFormCtrl', function($state, $stateParams, Restangular) {
		const contactService = Restangular.service('contacts');
		const ctrl = this;
		ctrl.contact = {};
		ctrl.save = saveContact;

		if ($stateParams.id !== '+') {
			contactService.one($stateParams.id).get().then((contact) => {
				ctrl.contact = contact;
			});
		}

		function saveContact(contact) {
			if (contact.id) {
				contact.put().then(() => {
					$state.go('contact-list');
				});
			} else {
				contactService.post(contact).then(() => {
					$state.go('contact-list');
				});
			}
		}
	});
})();
