(() => {
	'use strict';

	angular.module('es').config(wyswygConfig);

	function wyswygConfig($provide) {
		$provide.decorator('taOptions', decorate);
	}

	function decorate($delegate) {
		'ngInject';

		$delegate.forceTextAngularSanitize = true;

		$delegate.toolbar = [
			['bold', 'italics', 'underline', 'strikeThrough'],
			['quote'],
			['ul', 'ol'],
			['redo', 'undo', 'clear'],
			['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']
		];

		return $delegate;
	}
})();
