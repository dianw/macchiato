module.exports = (sequelize, DataTypes) => {
	const ContactGroup = sequelize.define('ContactGroup', {
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
		}
	}, {
		classMethods: {
			associate(models) {
				ContactGroup.belongsTo(models.Contact);
				ContactGroup.belongsTo(models.Group);
			},
			tableName: 'contact_group'
		}
	});

	return ContactGroup;
};
