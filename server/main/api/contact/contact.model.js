module.exports = (sequelize, DataTypes) => {
	const Contact = sequelize.define('Contact', {
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
		address: {
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.STRING
		},
		phone: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		}
	}, {
		tableName: 'contact'
	});

	return Contact;
};
