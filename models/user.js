const sql = require('../util/sql');
const Sequelize = require('sequelize');
// import table dependencies
const Photos = require('./photo');
const Likes = require('./like');
const Comments = require('./comment');

const Users = sql.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: Sequelize.STRING,
		notNull: true,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		notNull: true,
	},
	
});

// define table relations
Users.hasMany(Photos);
Users.hasMany(Comments);
Users.hasMany(Likes);

module.exports = Users;