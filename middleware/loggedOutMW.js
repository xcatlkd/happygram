const session = require("express-sessions");

const checkLoggedOut = function(req, res, next) {
	console.log(req.session);
	if (!req.session.userid) {
		next();
	} else {
		res.redirect('/user/home');
	}
}

module.exports = checkLoggedOut;