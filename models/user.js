const sql = require('../util/sql');
const Sequelize = require('sequelize');
// import table dependencies
const Files = require('./file');
const Likes = require('./like');
const Comments = require('./comment');
const fs = require("fs-extra");
const path = require("path");
const Jimp = require("jimp");


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

Users.prototype.upload = function(file) {
		return this.createFile({
				id: file.filename,
				size: file.size,
				originalName: file.originalname,
				mimeType: file.mimetype,
			})
			.then(function() {
				const ext = path.extname(file.originalname);
				const dest = "assets/files/" + file.filename + ext;
				return fs.copy(file.path, dest);
			})
			.then(function() {
					// If I'm an image, we should generate thumbnail
					// and preview images as well.
					if (file.mimetype.includes("image/")) {
						Jimp.read(file.path).then(function(img) {
							img.quality(80);
							img.resize(Jimp.AUTO, 400);
							return img.write("assets/files/" + file.filename + ".jpg");
						})
					}

					})
				}		




// define table relations
Users.hasMany(Files);
Users.hasMany(Comments);
Users.hasMany(Likes);

module.exports = Users;