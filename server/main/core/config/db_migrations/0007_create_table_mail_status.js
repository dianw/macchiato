module.exports = {
	up(migration, dataType) {
		return migration.createTable('mail_status', {
			id: {
				type: dataType.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			createdAt: {
				type: dataType.DATE,
				field: 'created_at'
			},
			updatedAt: {
				type: dataType.DATE,
				field: 'updated_at'
			},
			mailId: {
				type: dataType.INTEGER,
				field: 'mail_id',
				references: {
					model: 'mail',
					key: 'id'
				}
			},
			contactId: {
				type: dataType.INTEGER,
				field: 'contact_id',
				references: {
					model: 'contact',
					key: 'id'
				}
			},
			messageId: {
				type: dataType.STRING(200),
				field: 'message_id'
			},
			status: {
				type: dataType.STRING(20)
			},
			response: {
				type: dataType.TEXT('LONG')
			}
		});
	},
	down() {
	}
};
