(() => {
	'use strict';

	angular.module('es').controller('GroupFormCtrl', function($state, $stateParams, RestGroupService) {
		const ctrl = this;
		ctrl.group = {};
		ctrl.load = loadGroup;
		ctrl.save = saveGroup;

		if ($stateParams.id !== '+') {
			loadGroup();
		}

		function loadGroup() {
			RestGroupService.one($stateParams.id).get().then((group) => {
				ctrl.group = group;
			});
		}

		function saveGroup(group) {
			if (group.id) {
				group.put().then(() => {
					$state.go('group-list');
				});
			} else {
				RestGroupService.post(group).then(() => {
					$state.go('group-list');
				});
			}
		}
	});
})();
