const User = require('../models/user');

function deserializeUser(req, res, next) {
	if (req.session.userid) {
		User.findById(req.session.userid) 
		.then(function(user) {
			console.log("############################################################################", user);
			if (user) {
				req.user = user;
			} else {
				req.session.userid = null;
			}
			next();
		})
		.catch(function(err) {
			console.error("Deserialize User failed");
			console.error(err)
			next();
		});
	} else {
		next();
	}
}

module.exports = deserializeUser;