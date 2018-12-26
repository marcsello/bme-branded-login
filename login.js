class LoadingAnimation {

	constructor(id) {
		this.element = document.getElementById(id);
	}


	show() {
		this.element.classList.add("visible");
	}

	hide() {
		this.element.classList.remove("visible");
	}

	get visible() {
		return this.element.classList.contains("visible");
	}

}


class LoginFormManager {

	// possible css classes for the input fields: active wrong grey hidden

	constructor(username_field_id,password_field_id) {
		this.usernameElement = document.getElementById("username_field");
		this.passwordElement = document.getElementById("password_field");


		document.addEventListener('keyup', function(e) { // the wrong marker on the fields should disappear when the anykey is pressed
			this.usernameElement.classList.remove("wrong");
			this.passwordElement.classList.remove("wrong");
		}.bind(this));


		this.usernameElement.addEventListener('keydown', function(e) { // when the user press the enter (or tab) in the username field, it should procide to the password field

			if (e.key === "Enter" || e.key === "Tab") {

				e.preventDefault();

				if (this.usernameDoneCallback)
					this.usernameDoneCallback(this.username);

			}


		}.bind(this));

		this.passwordElement.addEventListener('keydown', function(e) { // when the user press enter in the password field. (tab should bring back to username field)

			if (e.key === "Enter") {

				e.preventDefault();

				if (this.passwordDoneCallback)
					this.passwordDoneCallback(this.password);

			} else if (e.key === "Tab") { // tab would bring back to the username entry... but lightdm should be notified about this as well, so we don't do anything yolo here

				e.preventDefault();

				if (this.passwordDiscardCallback)
					this.passwordDiscardCallback();


			}


		}.bind(this));

	}

	hide() { // and reset

		// reset
		this.usernameElement.value = "";
		this.passwordElement.value = "";

		// hide
		this.usernameElement.classList.remove("active","wrong","grey");
		this.usernameElement.classList.add("hidden");

		this.passwordElement.classList.remove("active","wrong","grey");
		this.passwordElement.classList.add("hidden");

		// disable both fields
		this.usernameElement.disabled = true;
		this.passwordElement.disabled = true;
	}

	promptUsername() { // and hide+reset password field
		// reset password
		this.passwordElement.value = "";

		this.passwordElement.classList.remove("active","wrong","grey");
		this.passwordElement.classList.add("hidden");

		// show username
		this.usernameElement.classList.remove("hidden","wrong","grey");
		this.usernameElement.classList.add("active");

		// set focus
		this.usernameElement.disabled = false;
		this.passwordElement.disabled = true;
		this.usernameElement.focus();

	}

	promptPassword() { // The username will be still visible, but greyed

		// grey username
		this.usernameElement.classList.remove("active","hidden","wrong");
		this.usernameElement.classList.add("grey");

		// show password
		this.passwordElement.classList.remove("hidden","wrong","grey");
		this.passwordElement.classList.add("active");


		// set focus
		this.usernameElement.disabled = true;
		this.passwordElement.disabled = false;
		this.passwordElement.focus();

	}

	finishAttempt() { // but does not touch the visibility
		this.usernameElement.disabled = true;
		this.passwordElement.disabled = true;
	}

	showUsernameError() {
		this.usernameElement.classList.add("wrong");
	}

	showPasswordError() {
		this.passwordElement.classList.add("wrong");
	}

	get username() {
		return this.usernameElement.value;
	}


	get password() {
		return this.passwordElement.value;
	}


	get active() { // check if any of the two fields are active
		return this.passwordElement.classList.contains("active") || this.usernameElement.classList.contains("active");
	}

}


function initLogin() { // Called when DOM is ready
	loading_animation = new LoadingAnimation("loading");
	loginform = new LoginFormManager("username_field","password_field");


	document.addEventListener('keyup', function(e) {

		if (e.key === "Enter" || e.key === " ") { // start authenticating when either enter or space is pressed
			if (!lightdm.in_authentication)
				lightdm.authenticate();
		} else if (e.key == "Escape") { // Escape cancels auth
			lightdm.cancel_authentication();
			loginform.hide() // for some reason lightdm does not send a callback to do this
			loading_animation.hide();
		}

	});


	/* Login form manager's callbacks */

	loginform.usernameDoneCallback = function(username) {

		lightdm.respond(username); // lightdm will tell us to show the password field

	};

	loginform.passwordDoneCallback = function(password) {

		loading_animation.show();
		loginform.finishAttempt(); // grey out password field
		lightdm.respond(password);

	};


	loginform.passwordDiscardCallback = function() { // tab key pressed in the password entry text
		lightdm.cancel_authentication();
		lightdm.authenticate();		// this should bring us back to the username field
	};



	/* LightDM's callbacks */


	window.show_prompt = function(text, type) { // lightdm's callback for showing promts

		if (type === "text") { // username
			loginform.promptUsername();
		} else if (type === "password") {
			loginform.promptPassword();
		}

	};


	window.authentication_complete = function() {
		loading_animation.hide();

		if (lightdm.is_authenticated) {
			lightdm.start_session();
		} else {
			lightdm.authenticate(loginform.username); // this should bring us back to the password form
			loginform.showPasswordError();
		}

	}


	window.show_message = function(text, type) {

		// TODO

	}



}

