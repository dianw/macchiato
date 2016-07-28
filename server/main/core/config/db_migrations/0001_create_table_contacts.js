module.exports = {
	up(migration, dataType) {
		return migration.createTable('contact', {
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
				type: dataType.STRING(500)
			},
			phone: {
				type: dataType.STRING(500)
			},
			email: {
				type: dataType.STRING(500)
			}
		});
	},
	down() {
	}
};
