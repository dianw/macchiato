module.exports = {
	up(migration, dataType) {
		return migration.createTable('contact_group', {
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
			contactId: {
				type: dataType.INTEGER,
				field: 'contact_id',
				references: {
					model: 'contact',
					key: 'id'
				}
			},
			groupId: {
				type: dataType.INTEGER,
				field: 'group_id',
				references: {
					model: 'group',
					key: 'id'
				}
			}
		});
	},
	down() {
	}
};
