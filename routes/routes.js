// module configurations  ###############################

const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-sessions');

// database configurations  #############################

const sql = require('../util/sql');
const User = require('../models/user');
const Photo = require('../models/photo');
// const Comment = require('../models/comment');
// const Like = require('../models/like');

// middleware  #########################################

// loggedOutMW will check if user.session and redirect to user/:userid
// else next();

// const sessionMW = require('../middleware/sessionMW');
const loggedOutMW = require('../middleware/loggedOutMW');

// router.use(sessionMW);
// router.use(loggedOutMW);

// routes  #############################################

router.get('/', function(req, res) {
	res.render("layout", { page: "home" });
});

router.get('/signup', function(req, res) {
		res.render("signup", { page: "home" });
});

router.post('/signup', function(req, res) {

	if (req.body.password && req.body.password === req.body.confirm) {
		User.signup(req)
		.then(function(user) {
			console.log("*************************************************************************************", user);
			res.redirect('/user/home');
		})
		.catch(function(err) {
			console.error(err);
		})
	} else {

	}
});

router.get('/login', function(req, res) {
	res.render("login");
});

router.post('/login', function(req, res) {

});

module.exports = router;