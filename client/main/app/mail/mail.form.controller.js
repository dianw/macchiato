(() => {
	'use strict';

	angular.module('es').controller('MailFormCtrl', function($state, $stateParams, RestGroupService, RestMailService, RestTemplateService) {
		const ctrl = this;
		ctrl.mail = {};
		ctrl.load = loadMail;
		ctrl.loadContacts = loadGroupsContacts;
		ctrl.save = saveMail;

		loadGroups();
		loadTemplates();

		if ($stateParams.id !== '+') {
			loadMail();
		}

		function loadGroupsContacts(group) {
			group.getList('contacts', ctrl.searchParams).then(contacts => {
				group.contacts = contacts;
			});
		}

		function loadGroups() {
			RestGroupService.getList().then(groups => {
				ctrl.groups = groups;

				if (!ctrl.mail.group) {
					ctrl.mail.group = groups[0];
					loadGroupsContacts(groups[0]);
				}
			});
		}

		function loadMail() {
			RestMailService.one($stateParams.id).get().then((mail) => {
				ctrl.mail = mail;
			});
		}

		function loadTemplates() {
			RestTemplateService.getList().then(templates => {
				ctrl.templates = templates;

				if (!ctrl.mail.template) {
					ctrl.mail.template = templates[0];
				}
			});
		}

		function saveMail(mail) {
			if (mail.id) {
				mail.put().then(() => {
					$state.go('mail-list');
				});
			} else {
				RestMailService.post(mail).then(() => {
					$state.go('mail-list');
				});
			}
		}
	});
})();
