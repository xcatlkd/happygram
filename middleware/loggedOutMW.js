
const checkLoggedOut = function(req, res, next) {
	console.log(req.session.userid);
	if (!req.session.userid) {
		//console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  loggedOutMW %%%%%%%%%%%%%%%%  :")
		next();
	} else {


		//console.log("$$$$$$$$$$$$$$$$ loggedOutMW $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$:  req.session.userid: ", req.session.userid);		
		res.redirect('/user/home');
	}
}

module.exports = checkLoggedOut;