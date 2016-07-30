(() => {
	'use strict';

	angular.module('es').controller('GroupListCtrl', function($location, RestGroupService) {
		const ctrl = this;
		ctrl.delete = deleteGroup;
		ctrl.search = loadGroups;

		// paging
		ctrl.searchParams = $location.search();
		ctrl.searchParams.hash = 0;
		ctrl.searchParams.page = _.defaultTo(ctrl.searchParams.page, 0);
		ctrl.searchParams.max = _.defaultTo(ctrl.searchParams.max, 10);
		ctrl.currentPage = _.defaultTo(ctrl.currentPage, ctrl.searchParams.page + 1);

		loadGroups();

		function loadGroups() {
			ctrl.searchParams.hash++;
			ctrl.searchParams.page = ctrl.currentPage - 1;
			delete ctrl.searchParams.offset;

			$location.search(ctrl.searchParams);

			ctrl.searchParams.offset = ctrl.searchParams.max * ctrl.searchParams.page;

			RestGroupService.getList(ctrl.searchParams).then((groups) => {
				ctrl.groups = groups;
			});
		}

		function deleteGroup(group) {
			const confirm = window.confirm('Delete groups?');
			if (!confirm) {
				return;
			}

			group.remove().then(() => {
				loadGroups();
			});
		}
	});
})();
