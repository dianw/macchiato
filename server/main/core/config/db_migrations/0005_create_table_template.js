module.exports = {
	up(migration, dataType) {
		return migration.createTable('template', {
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
			title: {
				type: dataType.STRING(200)
			},
			template: {
				type: dataType.TEXT('LONG')
			}
		});
	},
	down() {
	}
};
