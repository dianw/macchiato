module.exports = {
	up(migration) {
		return migration.addIndex('contact_group', ['contact_id', 'group_id'], {
			indicesType: 'UNIQUE'
		});
	},
	down() {
	}
};
