$(document).ready(function() {


//  Declare variables

var bodyId = $("body").attr('id');
var $username = $("input[name='username']");
var $password = $("input[name='password']");
var $confirm = $("input[name='confirm']");
var $submit = $("button");
var $formUsername = $(".js-username");
var $formPassword = $(".js-password");
var $formConfirm = $(".js-confirm");


$submit.on("click", function(event) {
		event.preventDefault();
		console.log("Clicked");
		if (!$username.val()) {
			$formUsername.removeClass("hidden");
		} else {
			var username = $username.val();
		}
		if (!$username.val()) {
			$formPassword.removeClass("hidden");
		} else {
			var password = $password.val();
		}
		if ($confirm.length && $confirm.val() !== $password.val()) {
			$formConfirm.removeClass("hidden");
		} else if ($confirm.length) {
			var confirm = $confirm.val();
		}
		// $ajax submit to server for signup
		if (bodyId === "signup" && confirm && confirm === password && username) {
		console.log("What is wrong here.");
			$.ajax("/signup", {
				method: "POST",
				data: {
					username: username,
					password: password,
					confirm: confirm,
				},
				success: function() {
					window.location = "/user/home";
				},
				error: function() {
					console.error("error");
				},
			});
		}
		if (bodyId === "login" && password && username) {
			$.ajax("/login", {
				method: "POST",
				data: {
					username: username,
					password: password,
				},
				success: function() {
					window.location = "/user/home";
				},
				error: function() {
					console.error("error");
				},
			});
		}
});

$username.on("keyup", function(event) {
	let searchName = event.target.value;
	let searchLength = event.target.value.length
	console.log(searchName, searchLength);
	if (searchLength >= 3) {
		// change loading img
		$.ajax("/signup/search", {
			method: "POST",
			data: searchName,
			success: function(status) {
				exists = status.status;
				if (exists === false) {
					// change loading img to "accepted"
					console.log("false");
				}
				else if (exists === true) {
					// change loading img to "user exists"
					// show error to user, suggest alternate name
					// disable submit button
					console.log("true wrong");
				}
			},
			error: function() {

			},
		})

	}
});

});
