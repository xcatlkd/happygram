const User = require('../models/user');

function deserializeUser(req, res, next) {
	if (req.session.userid) {
		User.findById(req.session.userid) 
		.then(function(user) {
			console.log("#########################   deserializeUser   ################################", user.id);
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
		console.log("%%%%%%%%%%%%%%%%%%%%%%%  deserializeUser: no req.session.userid  %%%%%%%%%%%%%% ", req.session);
		next();
	}
}

module.exports = deserializeUser;

