
function userAuth (req, res, next) {
	if (req.session.userid) {
		console.log("############################## userAuthMW ################################ req.user: ", req.user);
		next();
	} else {
		console.log("############################### userAuthMW ################################# req.user: ", req.user);
		res.redirect('../login');
	}
};

module.exports = userAuth;