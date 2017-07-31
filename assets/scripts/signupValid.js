$(document).ready(function() {
// 

var $username = $("input[name='username']");
var $loadingImg = $(".js-loading-img");
var $usernameError = $(".js-username-error");
var $submit = $("button");


$username.on("keyup", function(event) {
	let searchName = event.target.value;
	let searchLength = event.target.value.length

	if (searchLength >= 3) {
		$loadingImg.css("background-image", "url('/images/loading02.gif')");
		$.ajax("/signup/search", {
			method: "POST",
			data: {username: searchName},
			success: function(status) {
				exists = status.status;
				if (exists === false) {
					$loadingImg.css("background-image", "url('/images/check.jpg')");
					$usernameError.addClass("hidden")
					$submit.attr("disabled", false);
				}
				else if (exists === true) {
					$loadingImg.css("background-image", "url('/images/x.png')");
					$usernameError.removeClass("hidden");
					$submit.attr("disabled", "disabled");
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
