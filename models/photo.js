const sql = require('../util/sql');
const Sequelize = require('sequelize');
// import the comments and the likes models here
const Users = require('./user');
const Likes = require('./like');
const Comments = require('./comment');

const Photos = sql.define('photo', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	photo: {
		type: Sequelize.BLOB,
		notNull: true,
	},
	description: {
		type: Sequelize.TEXT,
		notNull: true,
	}
});

Photos.hasMany(Comments);
Photos.hasMany(Likes);

// create the relations between comments and likes here

module.exports = Photos;

