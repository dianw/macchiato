(() => {
	'use strict';

	angular.module('es').controller('MailListCtrl', function($location, RestMailService) {
		const ctrl = this;
		ctrl.delete = deleteMail;
		ctrl.search = loadMails;

		// paging
		ctrl.searchParams = $location.search();
		ctrl.searchParams.hash = 0;
		ctrl.searchParams.page = _.defaultTo(ctrl.searchParams.page, 0);
		ctrl.searchParams.max = _.defaultTo(ctrl.searchParams.max, 10);
		ctrl.currentPage = _.defaultTo(ctrl.currentPage, ctrl.searchParams.page + 1);

		loadMails();

		function loadMails() {
			ctrl.searchParams.hash++;
			ctrl.searchParams.page = ctrl.currentPage - 1;
			delete ctrl.searchParams.offset;

			$location.search(ctrl.searchParams);

			ctrl.searchParams.offset = ctrl.searchParams.max * ctrl.searchParams.page;

			RestMailService.getList(ctrl.searchParams).then((mails) => {
				ctrl.mails = mails;
			});
		}

		function deleteMail(mail) {
			const confirm = window.confirm('Delete mails?');
			if (!confirm) {
				return;
			}

			mail.remove().then(() => {
				loadMails();
			});
		}
	});
})();
