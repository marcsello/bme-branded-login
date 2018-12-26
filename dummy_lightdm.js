/** This is a dummy lightdm class, used to test/demo the greeter theme */

auth_phase = 0; // this is supposed to be a static variable :/

class lightdm {

	static authenticate(username) {
		if (username) {
			auth_phase = 2;

			window.show_prompt("Password","password");

		} else {
			auth_phase = 1;

			window.show_prompt("Login","text");
		}

	}


	static respond(input) {

		if (auth_phase == 1) {

			auth_phase = 2;
			window.show_prompt("Password","password");
		} else if (auth_phase == 2) {

			setTimeout(function() {
				window.authentication_complete();
			},2000);


		}


	}

	static cancel_authentication() {

		auth_phase = 0;

	}

	static start_session() {
		// nothing to do
	}

	static get is_authenticated() {
		return false;
	}

	static get in_authentication() {
		return auth_phase != 0;
	}

}
