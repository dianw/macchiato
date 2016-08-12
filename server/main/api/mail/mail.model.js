module.exports = (sequelize, DataTypes) => {
	const Mail = sequelize.define('Mail', {
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
				Mail.belongsTo(models.Group);
				Mail.belongsTo(models.Template);
			}
		},
		tableName: 'mail'
	});

	return Mail;
};
