module.exports = (sequelize, DataTypes) => {
	const Group = sequelize.define('Group', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		createdAt: {
			type: DataTypes.DATE,
			field: 'created_at'
		},
		updatedAt: {
			type: DataTypes.DATE,
			field: 'updated_at'
		},
		name: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.STRING
		}
	}, {
		tableName: 'group'
	});

	return Group;
};
