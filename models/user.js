const sql = require('../util/sql');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const path = require('path');
const Jimp = require('jimp');
const Files = require('./file');
// import table dependencies

const Likes = require('./like');
const Comments = require('./comment');
const fs = require("fs-extra");



const User = sql.define('user', {
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
	isActive: {
		type: Sequelize.BOOLEAN,
	}}, {
	hooks: {
		beforeCreate: hashUserPassword,
		beforeUpdate: hashUserPassword,
	},
});


User.prototype.upload = function(file) {
		return this.createFile({
				id: file.filename,
				size: file.size,
				originalName: file.originalname,
				mimeType: file.mimetype,
				description: "",
			})
			.then(function() {
				const ext = path.extname(file.originalname);
				const dest = "assets/files/" + file.filename + ext;
				return fs.copy(file.path, dest);
			})
			.then(function() {
					// If I'm an image, we should generate thumbnail
					
					if (file.mimetype.includes("image/")) {
						Jimp.read(file.path).then(function(img) {
							img.quality(90);
							img.resize(Jimp.AUTO, 400);
							// img.create(file.filename);
							return img.write("assets/files/" + file.filename + ".jpg");
						})
					}

					})
				}		

// additional user functionality

function hashUserPassword(user) {
	if (user.password) {
		return bcrypt.genSalt()
		.then(function(salt) {
			return bcrypt.hash(user.password, salt);
		})
		.then(function(hashedPassword) {
			user.password = hashedPassword;
		});
	}
};

User.prototype.comparePassword = function(password) {
	return bcrypt.compare(password, this.get("password"));
};


User.signup = function(req) {
	return User.create({
		username: req.body.username,
		password: req.body.password,
		isActive: true,
	})
	.then(function(user) {
		return user;
	})
};

User.prototype.login = function(req) {
	User.findOne({ where:	{
		username: req.body.username,
	}})
	.then(function(user) {
		if (user) {
			user.comparePassword(req.body.password).then(function(valid) {
				if (valid) {
					req.session.userid = user.get("id");
					req.session.save(function(err) {
						res.redirect("/user/home");
					})
				}
				else {
					console.error("bad password");
				}
			})
			.catch(function(err) {
				console.error(err);
			})
		}
		else {
			console.error("User not found");
		}
	})
};


User.prototype.like = function(fileid) {
	return this.createLike({
		fileid: fileid,
	})
	.then(function(like) {
		if (like) {
			console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ User.like $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$:: success");
		}
		else {
			console.error("::::::::::::::::::::::::::::::::::::::::::::::::::::  User.like ::::::::::::::::::::::::::::::( no likey");
		}
	})
};


// define table relations


User.hasMany(Comments);
User.hasMany(Likes);
User.hasMany(Files);
module.exports = User;