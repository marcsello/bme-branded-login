class LoadingAnimation {

	constructor(id) {
		this.element = document.getElementById(id);
	}


	show() {
		this.element.classList.add("loading_visible");
	}

	hide() {
		this.element.classList.remove("loading_visible");
	}

	visible() {
		return this.element.classList.contains("loading_visible");
	}

}


document.addEventListener('keyup', function(e) {

	if (e.key === "Enter") {

		if (document.activeElement == username_field) {

			password_field.focus()
		}
		else if (document.activeElement == password_field) {

			startAuth(username_field.value,password_field.value);
		} else {

			username_field.focus();
		}

	}
	else if (e.key === "Escape") {
		resetLogin();
	}
	else if (e.key === " ") {
		if ((document.activeElement != username_field) && (document.activeElement != password_field))
			username_field.focus();
	}

});

document.addEventListener('keydown',function(e) { // Disable tab when we are on the password entry field

	if (e.key === "Tab") {
		if (document.activeElement == password_field)
			e.preventDefault();
	}

});


document.addEventListener('mousedown',function(e) {

	if ((e.target != username_field) && (e.target != password_field))
		e.preventDefault();

});

function initLogin() { // Called when DOM is ready
	username_field = document.getElementById("username_field");
	password_field = document.getElementById("password_field");
	loading_animation = new LoadingAnimation("loading");
}

function resetLogin() {
	document.activeElement.blur(); // reset selection
	username_field.value = "";
	password_field.value = "";
	loading_animation.hide();
}

function startAuth(username,password) {
	loading_animation.show();

}
