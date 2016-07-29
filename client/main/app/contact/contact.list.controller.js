(() => {
	'use strict';

	angular.module('es').controller('ContactListCtrl', function($location, RestContactService) {
		const ctrl = this;
		ctrl.delete = deleteContact;
		ctrl.search = loadContacts;

		// paging
		ctrl.searchParams = $location.search();
		ctrl.searchParams.hash = 0;
		ctrl.searchParams.page = _.defaultTo(ctrl.searchParams.page, 0);
		ctrl.searchParams.max = _.defaultTo(ctrl.searchParams.max, 10);
		ctrl.currentPage = _.defaultTo(ctrl.currentPage, ctrl.searchParams.page + 1);

		loadContacts();

		function loadContacts() {
			ctrl.searchParams.hash++;
			ctrl.searchParams.page = ctrl.currentPage - 1;
			delete ctrl.searchParams.offset;

			$location.search(ctrl.searchParams);

			ctrl.searchParams.offset = ctrl.searchParams.max * ctrl.searchParams.page;

			RestContactService.getList(ctrl.searchParams).then((contacts) => {
				ctrl.contacts = contacts;
			});
		}

		function deleteContact(contact) {
			const confirm = window.confirm('Delete contacts?');
			if (!confirm) {
				return;
			}

			contact.remove().then(() => {
				loadContacts();
			});
		}
	});
})();
