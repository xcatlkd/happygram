const sql = require('../util/sql');
const Sequelize = require('sequelize');
// import the comments and the likes models here
const User = require('./user');
const Likes = require('./like');
const Comments = require('./comment');
const fs = require("fs-extra");
const path = require("path");
const multer = require("multer");
const uploader = multer({
	dest: "uploads/"
});


const Files = sql.define("file", {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	description: {
		type: Sequelize.TEXT,
		notNull: true,
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


// Files.prototype.like = function(fileid) {
// 	return this.createLike({
// 		fileid: fileid,
// 	})
// 	.then(function(like) {
// 		if (like) {
// 			console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ User.like $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$:: success");
// 		}
// 		else {
// 			console.error("::::::::::::::::::::::::::::::::::::::::::::::::::::  User.like ::::::::::::::::::::::::::::::( no likey");
// 		}
// 	})
// };


Files.hasMany(Comments).ondelete;
Files.hasMany(Likes);

// create the relations between comments and likes here





module.exports = Files;