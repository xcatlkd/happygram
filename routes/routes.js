const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
	res.render("layout", { page: "home" });
});



module.exports = router;