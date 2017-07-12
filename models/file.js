const sql = require('../util/sql');
const Sequelize = require('sequelize');
// import the comments and the likes models here
const Users = require('./user');
const Likes = require('./like');
const Comments = require('./comment');
const fs = require("fs-extra");
const path = require("path");


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

// Files.prototype.upload = function(req) {
// 		return this.updateFile({
// 				description: req.body.description,
// 			})
// 		}		

// Files.find({ where: { fileId: id } })
//   .then('success', function (project) {
//     // Check if record exists in db
//     if (project) {
//       project.updateAttributes({
//         title: 'a very different title now'
//       })
//       .success(function () {})
//     }
//   })



Files.hasMany(Comments);
Files.hasMany(Likes);

// create the relations between comments and likes here

module.exports = Files;