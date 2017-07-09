const sql = require('../util/sql');
const Sequelize = require('sequelize');
// import the comments and the likes models here
const Users = require('./user');
const Likes = require('./like');
const Comments = require('./comment');
const fs = require("fs-extra");
const path = require("path");
const Jimp = require("jimp");

const Files = sql.define("file", {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	size: {
		type: Sequelize.INTEGER,
		notNull: true,
	},
	originalName: {
		type: Sequelize.STRING,
		notNull: true,
	},
	mimeType: {
		type: Sequelize.STRING,
		notNull: true,
	},
});



						Files.hasMany(Comments);
						Files.hasMany(Likes);

						// create the relations between comments and likes here

						module.exports = Files;