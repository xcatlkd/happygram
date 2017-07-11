// module configurations  ###############################

const express = require('express');
const router = express.Router();
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const session = require('express-sessions');

// router.use(bodyParser.urlencoded());
// router.use(bodyParser.json());

// database configurations  #############################

// const sql = require('../util/sql');
const User = require('../models/user');
const Photo = require('../models/photo');
// Photo model should have a method for requesting all comments and like
// so no need to import those models explicitly..
// const Comment = require('../models/comment');
// const Like = require('../models/like');

// middleware  #########################################

// const deserializeUser = require('../middleware/deserializeUser');
// router.use(deserializeUser);

// routes  #############################################


router.get('/home', function(req, res) {
	console.log("******************   '/user/home'    ****************************** req.session: ", req.session);
	res.render("home", { user: req.user });
});

router.get('/:userId', function(req, res) {
	res.render("", { user: ""}) ;
});

module.exports = router;