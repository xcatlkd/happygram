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


	// Ajax call queries the db and returns likes for each photo on page load.
	// Then checks each userId against the current user and changes behavior
	// of the like button accordingly.
	function likeRequest(ids) {
		var idArray = $.makeArray(ids);

		console.log("idArray..........", idArray);
		$.ajax("/form/likes", {
			method: "POST",
			data: {ids: idArray},
			// data: JSON.stringify(idArray),
			success: function(likes) {

				console.log("something happened");
				console.log(likes);
			},
			error: function() {

			},
		});
	};
	likeRequest(values);



	likeImg.on("click", function(event) {
		event.preventDefault();
		value = event.target.parentNode.getAttribute('value');

		$.ajax("/form/like/" + value, {
			method: "POST",
			success: function() {
				$(event.target).attr("src", "/images/liked.png");
			},
			error: function() {
				console.error("error");
			},
		});

	});







});