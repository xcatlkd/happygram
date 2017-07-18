$(document).ready(function() {

	var like = $(".like-img-form button");
	var likeImg = $(".like-img-form img");


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