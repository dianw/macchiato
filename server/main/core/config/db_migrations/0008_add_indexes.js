const promise = require('bluebird');

module.exports = {
	up(migration, dataType) {
		return promise.attempt(() => {
			// contact
			migration.changeColumn('contact', 'email', { type: dataType.STRING(200), allowNull: false });
			migration.changeColumn('contact', 'name', { type: dataType.STRING(500), allowNull: false });
			migration.changeColumn('contact', 'phone', { type: dataType.STRING(100), allowNull: false });

			// group
			migration.changeColumn('group', 'name', { type: dataType.STRING(200), allowNull: false });

			// contact_group
			migration.changeColumn('contact_group', 'contact_id', { type: dataType.INTEGER, allowNull: false });
			migration.changeColumn('contact_group', 'group_id', { type: dataType.INTEGER, allowNull: false });

			// template
			migration.changeColumn('template', 'template', { type: dataType.TEXT('LONG'), allowNull: false });
			migration.changeColumn('template', 'title', { type: dataType.STRING(200), allowNull: false });

			// mail
			migration.changeColumn('mail', 'group_id', { type: dataType.INTEGER, allowNull: false });
			migration.changeColumn('mail', 'template_id', { type: dataType.INTEGER, allowNull: false });

			// mail_status
			migration.changeColumn('mail_status', 'contact_id', { type: dataType.INTEGER, allowNull: false });
			migration.changeColumn('mail_status', 'mail_id', { type: dataType.INTEGER, allowNull: false });
			migration.changeColumn('mail_status', 'message_id', { type: dataType.STRING(200), allowNull: false });
			migration.changeColumn('mail_status', 'response', { type: dataType.TEXT('LONG'), allowNull: false });
			migration.changeColumn('mail_status', 'status', { type: dataType.STRING(20), allowNull: false });
		});
	},
	down() {
	}
};
