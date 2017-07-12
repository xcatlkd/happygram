$(document).ready(function() {


//  Declare variables

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
			console.log("$username is null");
			$formUsername.removeClass("hidden");
		}
		if (!$username.val()) {
			console.log("$password is null");
			$formPassword.removeClass("hidden");
		}
		if ($confirm.length && !$confirm.val()) {
			console.log("$confirm is null");
			$formConfirm.removeClass("hidden");
		}

});



});
