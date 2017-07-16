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
		file.update({
			description: req.body.description
		}).then(function() {

			res.redirect("/form/gram/");
		})

	}).catch(function(err) {
		console.error("Something went wrong with upload", err);

	});
	//description: req.body.description
});


router.post("/comment", function(req,res) {
    if (!req.body.fileId || !req.body.comment) {
        return res.status(500).send("Missing required comment field");
    }
    Files.findById(req.body.fileId).then(function(file) {
        if (file) {
            file.createComment({
                text: req.body.comment,
            })
            .then(function() {
                res.redirect("/form/gram/");
            });
        }
        else {
            res.render(res, "404");
        }
    });
});


router.get("/gram", function(req, res) {
	Files.findAll({
		order: [
			['createdAt', 'DESC']
		]
	}).then(function(file) {
		//console.log(file, "999999999999999999999999999999999999999999")
		res.render("gram", {
			files: file,

		});
	});
});

module.exports = router;