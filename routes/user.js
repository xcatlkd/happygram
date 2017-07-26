// module configurations  ###############################

const express = require('express');
const router = express.Router();

// database configurations  #############################

const User = require('../models/user');
const Files = require('../models/file');

// Photo model should have a method for requesting all comments and like
// so no need to import those models explicitly..
// const Comment = require('../models/comment');
// const Like = require('../models/like');

// middleware  #########################################



const userAuthMW = require('../middleware/userAuthMW');
// router.use(userAuthMW);


// routes  #############################################

// add a logged in check to the user/home route to redirect to app/home or user page

router.get('/home', function(req, res) {
	if (req.user) {
		Files.findAll({ where: {
			userId: req.user.id,
		}})
		.then(function(data) {
			res.render("home", { thisUser: req.user, user: req.user, data: data });
		});
	} else {
		res.redirect('/');
	}
});

router.get('/logout', function(req, res) {
	req.session.userid = null;
	res.redirect('../');
});


router.get('/:username', function(req, res) {
	User.findOne({ where: {
		username: req.params.username,
	}})
	.then(function(user) {
		if (user) {
			return user;	
		}
		else {
			res.render("home", { error: "No such user"});
		}
	})
	.then(function(user) {
		Files.findAll({ where: {
			userId: user.id,
	}})
	.then(function(data) {
		res.render("home", { thisUser: user, data: data, user: req.user });
	})
	.catch(function(err) {
		console.error(err);
	})
});
});

// experimental route utilizing the photo object creation method on Files model.

// router.get('/:username', function(req, res) {
// 	User.findOne({ where: {
// 		username: req.params.username,
// 	}})
// 	.then(function(user) {
// 		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!", user);
// 		if (user) {
// 			Files.createPhotoObject(user.id);
// 		}
// 		else {
// 			res.render("home", { error: "No such user"});
// 		}
// 	})
// 	.then(function(data) {
// 		console.log("*********************", data, "*************************");
// 		res.render("home", { thisUser: user, data: data, user: req.user });
// 	})
// 	.catch(function(err) {
// 		console.error(err);
// 	})
// });


module.exports = router;