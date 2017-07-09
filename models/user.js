const sql = require('../util/sql');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const fs = require('fs-extra');
const path = require('path');
const Jimp = require('jimp');

// import table dependencies
const Photos = require('./photo');
const Likes = require('./like');
const Comments = require('./comment');

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
	return bcrypt.compare(pw, this.get("password"));
};

User.prototype.uploadImage = function(file) {

};



// define table relations
User.hasMany(Photos);
User.hasMany(Comments);
User.hasMany(Likes);

module.exports = User;