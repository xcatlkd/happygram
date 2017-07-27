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
	}
}, {
	hooks: {
		beforeCreate: hashUserPassword,
		beforeUpdate: hashUserPassword,
	},
});


User.prototype.upload = function(file, body) {
	let image;
	return this.createFile({
			id: file.filename,
			size: file.size,
			originalName: file.originalname,
			mimeType: file.mimetype,
			description: body.description,
		  
		})
		.then(function(data) {
			image = data;
			const ext = path.extname(file.originalname);
			const dest = "assets/photos/" + file.filename + ext;
			return	fs.copy(file.path, dest)
		})
		.then(function() {
			// If I'm an image
			if (file.mimetype.includes("image/")) {
				return Jimp.read(file.path)
			.then(function(img) {
					img.quality(80);
					img.resize(Jimp.AUTO, 300);
					// img.create(file.filename);
					return	img.write("assets/files/" + file.filename + ".jpg")
			});
			}
			})
		.then(function() {
					return image;
		});
};


//additional user functionality

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

User.search = function(username) {
	return User.findOne({ where: {
		username: username,
	}})
	.then(function(user) {
		if (user) {
			return true;
		} else {
			return false;
		}
	})
};

User.signup = function(req) {
	return User.create({
			username: req.body.username,
			password: req.body.password,
			isActive: true,
		})
		.then(function(user) {
			return user;
		});
};


User.prototype.like = function(fileid) {
	return Likes.upsert({
		userid: this.id,
		fileid: fileid,
		liked: true,  	// will need to eventually change this to a value from the page in order to toggle liked / unliked
	})
	.then(function(test) {
		if (test) {
			console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ User.like $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$:: updated ", test);
		}
		else {
			console.error("::::::::::::::::::::::::::::::::::::::::::::::::::::  User.like ::::::::::::::::::::::::::::: created");
		}
	})
};


// define table relations


User.hasMany(Comments);
User.hasMany(Likes);
User.hasMany(Files);
module.exports = User;