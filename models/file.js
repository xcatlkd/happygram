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


Files.prototype.like = function(userid) {
	return Likes.upsert({
		userid: userid,
		fileid: this.id,
		liked: true,  	// will need to eventually change this to a value from the page in order to toggle liked / unliked
	})
	.then(function(test) {
		if (test) {
			return test;
		}
		else {
			console.error("Error; Files.like");
		}
	})
};


Files.findUser = function(user) {
	if (user) {
		User.findOne({ where: {
			username: user,
		}})
		.then(function(user) {
			if (user) {
				return user;
			} else {
				User.findOne({ where: {
					userId: user,
				}})
				.then(function(user) {
					return user;
				})
			}
		})
	} else {
		return null;
	}
};

// Pass this function a user id to create an array of objects for each photo that belongs to that user. 
// This object will contain references to each photo's comments and likes using the include[] functionality of sequelize.
// Optionally, pass this function `null` and it will find all photos of all users in the same manner.

Files.createPhotoObject = function(user) {
	Files.findUser(user).then(function(user) {

	if (user) {
		return Files.findAll({ where: { 
			userId: user.id,
			// include: [
			// 	{ model: Comments },
			// 	{ model: Likes },
			// ],
		}})
		.then(function(data) {
			return data;
		})
	} else {
		return Files.findAll({
			include: [
				{ model: Comments },
				{ model: Likes },
			],
		})
	}
});
}

Files.hasMany(Comments).ondelete;
Files.hasMany(Likes);

// create the relations between comments and likes here

module.exports = Files;