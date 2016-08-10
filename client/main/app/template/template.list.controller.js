(() => {
	'use strict';

	angular.module('es').controller('TemplateListCtrl', function($location, RestTemplateService) {
		const ctrl = this;
		ctrl.delete = deleteTemplate;
		ctrl.search = loadTemplates;

		// paging
		ctrl.searchParams = $location.search();
		ctrl.searchParams.hash = 0;
		ctrl.searchParams.page = _.defaultTo(ctrl.searchParams.page, 0);
		ctrl.searchParams.max = _.defaultTo(ctrl.searchParams.max, 10);
		ctrl.currentPage = _.defaultTo(ctrl.currentPage, ctrl.searchParams.page + 1);

		loadTemplates();

		function loadTemplates() {
			ctrl.searchParams.hash++;
			ctrl.searchParams.page = ctrl.currentPage - 1;
			delete ctrl.searchParams.offset;

			$location.search(ctrl.searchParams);

			ctrl.searchParams.offset = ctrl.searchParams.max * ctrl.searchParams.page;

			RestTemplateService.getList(ctrl.searchParams).then((templates) => {
				ctrl.templates = templates;

				templates.forEach(loadTemplatesContacts);
			});
		}

		function loadTemplatesContacts(template) {
			template.getList('contacts', { max: 0 }).then(contacts => {
				template.contacts = contacts;
			});
		}

		function deleteTemplate(template) {
			const confirm = window.confirm('Delete templates?');
			if (!confirm) {
				return;
			}

			template.remove().then(() => {
				loadTemplates();
			});
		}
	});
})();
