const sql = require('../util/sql');
const Sequelize = require('sequelize');

module.exports = sql.define('like', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	liked: {
		type: Sequelize.BOOLEAN,
	}
});