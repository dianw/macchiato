module.exports = (sequelize, DataTypes) => {
	const Template = sequelize.define('Template', {
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
		title: {
			type: DataTypes.STRING
		},
		template: {
			type: DataTypes.STRING
		}
	}, {
		tableName: 'template'
	});

	return Template;
};
