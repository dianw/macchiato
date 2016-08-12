module.exports = (sequelize, DataTypes) => {
	const MailStatus = sequelize.define('MailStatus', {
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
		messageId: {
			type: DataTypes.STRING,
			field: 'message_id'
		},
		status: {
			type: DataTypes.STRING
		},
		response: {
			type: DataTypes.TEXT
		}
	}, {
		classMethods: {
			associate(models) {
				MailStatus.belongsTo(models.Mail);
				MailStatus.belongsTo(models.Contact);
			}
		},
		tableName: 'mail_status'
	});

	return MailStatus;
};
