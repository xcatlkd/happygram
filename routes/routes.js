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




// routes  #############################################

router.get('/', function(req, res) {
	res.render("layout", { page: "home" });
});



module.exports = router;