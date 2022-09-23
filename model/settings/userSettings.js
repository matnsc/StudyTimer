class UserSettings {
	constructor(pomodoros, studytime, shortbreak, longbreak, notificationsEnabled, volume, studyNotification, sbNotification, lbNotification, autorunEnabled) {
		this._pomodoros = pomodoros;
		this._studytime = studytime;
		this._shortbreak = shortbreak;
		this._longbreak = longbreak;
		this._notificationsEnabled = notificationsEnabled;
		this._volume = volume;
		this._studyNotification = studyNotification;
		this._sbNotification = sbNotification;
		this._lbNotification = lbNotification;
		this._autorunEnabled = autorunEnabled;
	}

	get pomodoros() {
		return this._pomodoros;
	}

	get studytime() {
		return this._studytime;
	}

	get shortbreak() {
		return this._shortbreak;
	}

	get longbreak() {
		return this._longbreak;
	}

	get notificationsEnabled() {
		return this._notificationsEnabled;
	}

	get volume() {
		return this._volume;
	}

	get studyNotification() {
		return this._studyNotification;
	}

	get sbNotification() {
		return this._sbNotification;
	}

	get lbNotification() {
		return this._lbNotification;
	}

	get autorunEnabled() {
		return this._autorunEnabled;
	}
}