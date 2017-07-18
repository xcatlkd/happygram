const exp = require("express");
const User = require("../models/user");
const Gram = ("./util/gram");
const router = exp.Router();
const fs = require("fs-extra");
const Files = require("../models/file");
const Comment = require("../models/comment");
const multer = require("multer");
const uploader = multer({
	dest: "uploads/"
});

// Render an upload form that POSTs to /docs/upload
router.get("/", function(req, res) {
	res.render("form");
});

// Upload the form at GET /docs/upload
router.post("/", uploader.single("image"), function(req, res) {
	// Make sure they sent a file
	if (!req.file) {
		res.render("form", {
			error: "You must choose a file to upload",
		})
	}
	//Otherwise, try an upload
	req.user.upload(req.file, req.body).then(function(data) {
			// res.json(data)
			console.log(data, "kkkkkkkkkkkkkkkkkkkkkkkkkkkk")
			res.redirect("/form/" + data.id + "/description")
		})
		.catch(function(err) {
			console.error("Something went wrong with upload", err);
			render("Upload a File", "form", {
				error: "Something went wrong, please try a different file",
			});
		});
})

router.get("/:id/description", function(req, res) {
	res.render("description")
})

router.post("/:id/description", function(req, res) {
	Files.findOne({
		where: {
			id: req.params.id,
		}
	}).then(function(file) {
			
		if (file.userId === req.session.userid) {
			file.update({
				description: req.body.description
			}).then(function() {

				res.redirect("/form/gram/");
			})
	 	} 
	}).catch(function(err) {
		console.error("Something went wrong with upload", err);
	   res.redirect("/form/gram/");

	 });
});

router.post("/comment", function(req, res) {
	if (!req.body.fileId || !req.body.comment) {
		return res.status(500).send("Missing required comment field");
	}
	Files.findById(req.body.fileId).then(function(file) {
		if (file) {
			file.createComment({
					text: req.body.comment,
					userId: req.session.userid,
				})
				// .then(function(comment) {
				//     req.user.addComment({
				//     	userId: userId,
				//     })
			res.redirect("/form/gram");
			// });
		} else {
			res.render(res, "404");
		}
	});
});

router.get("/gram", function(req, res) {
	Files.findAll({
		include: [Comment]
	}).then(function(files) {
		//console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.\n', JSON.stringify(files), '\n>>>>>>>>>>>>>>>>>>>>>>>>>>\n')
		res.render("gram", {
			files: files,
		});

	});
});

router.post("/delete", function(req, res) {
	// console.log(req.session.userid, "ooooooooooooYYYYYYYYYYYYYYYYooooooooo")
	// console.log(req.body.fileId)
	Files.findById(req.body.fileId).then(function(file) {
		console.log(file.userId, "lllllllllllllllllPPPPPPPPPPPPPPPPPPPPPPPPiiiiiiiiii")

		if (file.userId === req.session.userid) {
			// if (file) {
			file.destroy({
				fileId: req.body.fileId,

			})
			res.redirect("/form/gram")

			// }
		}
	});
});

// router.post("/comment", function(req, res) {
// 			Files.findById(req.body.fileId).then(function(file) {
// 				//console.log(req.body.field, "gggggggggggggggggggggg")
// 				if (!req.body.fileId || !req.body.comment) {
// 					return res.status(500).send("Missing required comment field");
// 				}
// 				if (req.body.btn == "add") {
// 					Files.findById(req.body.fileId).then(function(file) {
// 						//console.log(req.session.userid, "gggggggggggggggggggggg")
// 						if (file) {
// 							file.createComment({
// 									text: req.body.comment,
// 									userId: req.session.userid,
// 								})
// 								// .then(function(comment) {
// 								//     req.user.addComment({
// 								//     	userId: userId,
// 								//     })
// 							res.redirect("/form/gram/");
// 							// });
// 						} else {
// 							res.render(res, "404");
// 						}

// 					})
// 				} else {
// 					Files.findById(req.body.fileId).then(function(file) {
// 						if (file) {

// 							file.destroy({
// 								fileId: req.body.fileId
// 							})
// 							res.render("gram")
// 						}
// 					})
// 				}
// 			})
// })
// router.get("/gram", function(req, res) {
// 	Files.findAll({
// 		order: [
// 			['createdAt', 'DESC']
// 		]
// 	}).then(function(file) 
// 		//console.log(file, "999999999999999999999999999999999999999999")
// 		res.render("gram", {
// 			files: file,

// 		});
// 	});
// });

module.exports = router;