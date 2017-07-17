$(document).ready(function() {

	// var userid = $(".js-userid").html();
	var fileUserIds = $(".userid");
	var like = $(".like-img-form button");
	var likeImg = $(".like-img-form img");

	// console.log(userId);
	// console.log(fileUserId);

	// for each on an array of photo.usernames 
	// $.each(fileUserIds, function() {
	// 	if (fileUserIds === userId) {

	// 	}
	// });

	like.on("click", function(event) {
		event.preventDefault();
		console.log("Click", event.target);
		$(event.target).attr("src", "../images/liked.png");
	});







});