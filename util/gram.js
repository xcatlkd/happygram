const Posts = require("../models/posts");

const Gram  = {
	getAll: function() {
		return Posts.findAll();
	},

	add: function(comment, image) {
		return Posts.create({
			
			comment: comment,
			image: image

		});

	},
    
    update: function(comment, like) {
	return Posts.update ({
			
			comment: comment,
			like: like
	});
},
	// delete: function(image) {
	// 	return Posts.destroy({
	// 		where: {
	// 		   userid: 
	// 			title:


	// 		}
	// 	})
	// }

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