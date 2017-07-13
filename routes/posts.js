const exp = require("express");
const User = require("../models/user");
const Gram = ("./util/gram");
const router = exp.Router();
const fs = require("fs-extra");
const Files = require("../models/file");

const multer = require("multer");
const uploader = multer({
	dest: "uploads/"
});


// Render all of a user's documents
// router.get("/", function(req, res) {
// 	let message = "";

// 	if (req.query.success) {
// 		message = "File uploaded succesfully!";
// 	}

// req.user.getFiles().then(function(file) {
// 	render("gram", {
// 		username: req.user.get("username"),
// 		gram: gram,
// 		message: message,
// 	});
// });
// });

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
	 req.user.upload(req.file).then(function() {
			res.redirect("/form/gram")
		})
		.catch(function(err) {
			console.error("Something went wrong with upload", err);
			render("Upload a File", "form", {
				error: "Something went wrong, please try a different file",
			});
		});
})


//Render an individual document
router.get("/gram/:fileId", function(req, res) {
	Files.findById(req.params.fileId).then(function(file) {
			// console.log(file, ")))))))))))))))))))))))))))))))))))))))))))))))))))))((((((((((((")
			if (file) {
				res.render(file.get("id"), "gram", {
					files: file,
				});
			} else {
				res.status(404);
				res.render("Not Found", "404");
			} // console.log(file, ")))))))))))))))))))))))))))))))))))))))))))))))))))))((((((((((((")
		})
		.catch(function(err) {
			console.error("Error while fetching file " + req.params.fileId, err);
			res.status(500).send("Something went wrong!")
		});
});

router.get("/gram", function(req, res) {
	Files.findAll({ order: [['createdAt', 'DESC']] }).then(function(file) {
		// console.log(file, "9999999999999999999999999999999999999999999999999999999999999999999999999999999999")
		res.render("gram", { 
			files: file,

		});
	});
});
		
// Sample routes for displaying user & file content
// test route for creating a like for a photo

router.post("/like/:fileid", function(req, res) {
	console.log(req.params.fileid);
	Files.findById(req.params.fileid)
	.then(function(file) {
		if (file && file.userid !== req.user.id) {

			req.user.like(req.params.fileid)
			.then(function(like) {
				res.redirect("../../form/gram");
			})
			.catch(function(err) {
				console.error(err);
			})
			
		}
	})
})


// Download a document, if it exists
// router.get("/download/:fileId", function(req, res) {
// 	File.findById(req.params.fileId).then(function(file) {
// 			if (file) {
// 				res.download("uploads/" + file.get("id"), file.get("originalName"));
// 			} else {
// 				res.status(404).send("No file found");
// 			}
// 		})
// 		.catch(function(err) {
// 			console.error(err);
// 			res.status(500).send("Something went wrong");
// 		});
// });



module.exports = router;