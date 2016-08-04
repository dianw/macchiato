(() => {
	'use strict';

	angular.module('es').controller('GroupContactListCtrl', function($location, $stateParams, RestContactService, RestGroupService) {
		const ctrl = this;
		ctrl.addContact = addContactToGroup;
		ctrl.removeContact = removeContactFromGroup;
		ctrl.search = loadGroupsContacts;
		ctrl.searchContacts = loadContacts;

		// paging
		ctrl.searchParams = $location.search();
		ctrl.searchParams.hash = 0;
		ctrl.searchParams.page = _.defaultTo(ctrl.searchParams.page, 0);
		ctrl.searchParams.max = _.defaultTo(ctrl.searchParams.max, 10);
		ctrl.currentPage = _.defaultTo(ctrl.currentPage, ctrl.searchParams.page + 1);

		loadGroup();

		function addContactToGroup(group, contact) {
			group.post('contacts', contact).then(() => {
				ctrl.contact = null;
				loadGroupsContacts(group);
			}, () => {
				ctrl.contact = null;
			});
		}

		function loadContacts(q) {
			return RestContactService.getList({ max: 5, q: q });
		}

		function loadGroup() {
			return RestGroupService.one($stateParams.id).get().then((group) => {
				ctrl.group = group;
				loadGroupsContacts(group);
			});
		}

		function loadGroupsContacts(group) {
			ctrl.searchParams.hash++;
			ctrl.searchParams.page = ctrl.currentPage - 1;
			delete ctrl.searchParams.offset;

			$location.search(ctrl.searchParams);

			ctrl.searchParams.offset = ctrl.searchParams.max * ctrl.searchParams.page;

			group.getList('contacts', ctrl.searchParams).then(contacts => {
				group.contacts = contacts;
			});
		}

		function removeContactFromGroup(group, contact) {
			const confirm = window.confirm(`Remove ${contact.name}?`);
			if (!confirm) {
				return;
			}

			group.one('contacts', contact.id).remove().then(() => {
				loadGroupsContacts(group);
			});
		}
	});
})();
