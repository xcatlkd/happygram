const sql = require('../util/sql');
const Sequelize = require('sequelize');


module.exports = sql.define("comment", {
	id: {		
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	text: {
		type: Sequelize.STRING(150),
	}
});
