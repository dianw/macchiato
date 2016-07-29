(() => {
	'use strict';

	angular.module('es').controller('ContactFormCtrl', function($state, $stateParams, RestContactService) {
		const ctrl = this;
		ctrl.contact = {};
		ctrl.load = loadContact;
		ctrl.save = saveContact;

		if ($stateParams.id !== '+') {
			loadContact();
		}

		function loadContact() {
			RestContactService.one($stateParams.id).get().then((contact) => {
				contact.phone = Number(contact.phone);
				ctrl.contact = contact;
			});
		}

		function saveContact(contact) {
			if (contact.id) {
				contact.put().then(() => {
					$state.go('contact-list');
				});
			} else {
				RestContactService.post(contact).then(() => {
					$state.go('contact-list');
				});
			}
		}
	});
})();
