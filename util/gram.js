const Posts = require("../models/posts");

const Gram  = {
	getAll: function() {
		return Posts.findAll();
	},

	add: function(title, comment, image) {
		return Posts.create({
			title: title,
			comment: comment,
			image: image

		});

	},
    
    update: function(title, comment, like) {
	return Posts.update ({
			title: title,
			comment: comment,
			like: like
	});
},
	delete: function(title) {
		return Posts.destroy({
			where: {
			   userid: 
				title:


			}
		})
	}

		search: function(search) {
		return Posts.findAll({
			where: {
				title: {
					$like: "%" + search + "%",
				},
			},
		});
	},
};

module.exports = Gram;