(() => {
	'use strict';

	angular.module('es').config(($httpProvider, RestangularProvider) => {
		RestangularProvider.setBaseUrl('/api');
		RestangularProvider.setDefaultHttpFields({cache: false});

		RestangularProvider.addResponseInterceptor(function(data, operation) {
			var extractedData;

			/*
			* if getList returned object instead of array
			* eg: { count: 8, rows: [ ... ] }
			*/
			if (operation === 'getList' && angular.isObject(data) && !angular.isArray(data)) {
				extractedData = angular.copy(data.rows, extractedData);
				delete data.rows;
				extractedData.meta = data;
			} else {
				extractedData = data;
			}

			return extractedData;
		});
	});
})();
