module.exports = {
	up(migration, dataType) {
		return migration.createTable('group', {
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
			name: {
				type: dataType.STRING(200)
			},
			description: {
				type: dataType.STRING(100)
			}
		});
	},
	down() {
	}
};
