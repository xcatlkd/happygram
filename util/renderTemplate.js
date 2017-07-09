module.exports = function(req, res, title, page, args) {
	res.render("template", {
		title: title || "No Title",
		page: page,
		isLoggedIn: !!req.user,
		pageArgs: args || {},
	});
};