$(document).ready(function() {

	var like = $(".like-img-form");
	var likeImg = $(".like-img-form img");
	var values = []
	console.log(like);

	like.map((indx, vals) => {
		values.push($(vals).attr("value"));
	});

	// Change image from unliked to liked
	function likedChange(target) {
		$(target).attr("src", "/images/liked.png");
		$(target).addClass("disable");
	};

// Ajax call queries the db and returns likes for each photo on page load.
// Then checks each userId against the current user and changes behavior
// of the like button accordingly.
	function likeRequest(ids) {
		var idArray = $.makeArray(ids);

		$.ajax("/form/likes", {
			method: "POST",
			data: {ids: idArray},
			success: function(likes) {
				likes.likes.forEach((vals, indx) => {
						if (vals.userid == userId) {
						var liked = $(`[value=${vals.fileid}] img`)[0];
						likedChange(liked);
					}
				});
			},
			error: function() {

			},
		});
	};
	likeRequest(values);

// Checks if user has already liked or submits like to db. On success,
// change like image to liked.
	likeImg.on("click", function(event) {
		event.preventDefault();
		value = event.target.parentNode.getAttribute('value');
		if ($(event.target).hasClass("disable")) {
			console.log("already liked");
		} 
		else {
			$.ajax("/form/like/" + value, {
				method: "POST",
				success: function() {
					likedChange(event.target);
				},
				error: function() {
					console.error("error");
				},
			});
		}

	});

});