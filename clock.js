months_names = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
days_names = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

function startTime() {
	var today = new Date();
	h = today.getHours();
	m = today.getMinutes();
	s = today.getSeconds();

	document.getElementById('clock').innerHTML = h + ':' + leadingZero(m);

	setTimeout(startTime,(60-s)*1000);
}

function startDate() {
	var today = new Date();

	y = today.getFullYear();
	m = months_names[today.getMonth()];
	d = today.getDate();

	document.getElementById('date').innerHTML = y + ". " + m + " " + d + ".";
	document.getElementById('day').innerHTML = days_names[today.getDay()];

	setTimeout(startDate,msecUntilMidnight(today));
}

function startDateTime() {
	startTime();
	startDate();
}

function leadingZero(a) {
	if (a < 10)
		return '0' + a;
	return a;
}

function msecUntilMidnight(today) {
	var midnight = new Date();
	midnight.setHours( 24 );
	midnight.setMinutes( 0 );
	midnight.setSeconds( 0 );
	midnight.setMilliseconds( 0 );

	return midnight.getTime() - today.getTime();
}

