$(document).ready(function() {

	var like = $(".like-img-form");
	var likeImg = $(".like-img-form img");
	// console.log(like);
	var values = []
	console.log(like);

	like.map((indx, vals) => {
		console.log(indx, vals);
		// console.log($(vals).attr("value"));
		values.push($(vals).attr("value"));
	});
	// console.log($(like).attr("value"));
	// console.log("values...", values);

	// Change image from unliked to liked
	function likedChange(target) {
		$(target).attr("src", "/images/liked.png");
		$(target).addClass("disable");
	};

	// var liked = $(".like-img-form value='vals.fileid'");
	// Ajax call queries the db and returns likes for each photo on page load.
	// Then checks each userId against the current user and changes behavior
	// of the like button accordingly.
	function likeRequest(ids) {
		var idArray = $.makeArray(ids);

		console.log("idArray..........", idArray);
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