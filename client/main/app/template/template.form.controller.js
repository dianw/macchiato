(() => {
	'use strict';

	angular.module('es').controller('TemplateFormCtrl', function($state, $stateParams, RestTemplateService) {
		const ctrl = this;
		ctrl.template = {};
		ctrl.load = loadTemplate;
		ctrl.save = saveTemplate;

		if ($stateParams.id !== '+') {
			loadTemplate();
		}

		function loadTemplate() {
			RestTemplateService.one($stateParams.id).get().then((template) => {
				ctrl.template = template;
			});
		}

		function saveTemplate(template) {
			if (template.id) {
				template.put().then(() => {
					$state.go('template-list');
				});
			} else {
				RestTemplateService.post(template).then(() => {
					$state.go('template-list');
				});
			}
		}
	});
})();
