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



});
