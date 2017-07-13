// module configurations  ###############################

const express = require('express');
const router = express.Router();

// database configurations  #############################

const User = require('../models/user');

// Photo model should have a method for requesting all comments and like
// so no need to import those models explicitly..
// const Comment = require('../models/comment');
// const Like = require('../models/like');

// middleware  #########################################

const userAuthMW = require('../middleware/userAuthMW');
// router.use(userAuthMW);

// routes  #############################################

router.get('/home', function(req, res) {
	console.log("******************   '/user/home'    ****************************** req.session: ", req.session);
	res.render("home", { user: req.user });
});

router.get('/logout', function(req, res) {
	req.session.userid = null;
	res.redirect('../');
});

router.get('/:userId', function(req, res) {
	User.findOne({ where: {
		id: req.params.userId,
	}
	})
	.then(function(user) {
		if (user) {
			console.log(user);
			res.render("home", { user: user }) ;
		}
		else {
			res.render("home", { error: "No such user"});
			console.log("No such user");
		}
	})
	.catch(function(err) {
		console.error(err);
	})
});

module.exports = router;