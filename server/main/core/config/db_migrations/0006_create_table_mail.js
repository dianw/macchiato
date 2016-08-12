module.exports = {
	up(migration, dataType) {
		return migration.createTable('mail', {
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
			groupId: {
				type: dataType.INTEGER,
				field: 'group_id',
				references: {
					model: 'group',
					key: 'id'
				}
			},
			templateId: {
				type: dataType.INTEGER,
				field: 'template_id',
				references: {
					model: 'template',
					key: 'id'
				}
			}
		});
	},
	down() {
	}
};
