$(document).ready(function() {
// 

var $username = $("input[name='username']");
var $loadingImg = $(".js-loading-img");
var $usernameError = $(".js-username-error");
var $submit = $("button");


$username.on("keyup", function(event) {
	let searchName = event.target.value;
	let searchLength = event.target.value.length
	console.log(searchName, searchLength);
	if (searchLength >= 3) {
		$loadingImg.css("background-image", "url('/images/loading02.gif')");
		$.ajax("/signup/search", {
			method: "POST",
			data: {username: searchName},
			success: function(status) {
				exists = status.status;
				console.log(status.status);
				if (exists === false) {
					$loadingImg.css("background-image", "url('/images/check.jpg')");
					$usernameError.addClass("hidden")
					$submit.attr("disabled", false);
					// change loading img to "accepted"
					console.log(exists);
				}
				else if (exists === true) {
					$loadingImg.css("background-image", "url('/images/x.png')");
					$usernameError.removeClass("hidden");
					$submit.attr("disabled", "disabled");
					// show error to user, suggest alternate name
					// disable submit button
					console.log(exists);
				}
			},
			error: function() {

			},
		})

	}
	else {
		$loadingImg.css("background-image", "url('/images/x.png')");

	}
});

});
