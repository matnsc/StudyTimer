class UserSettings {
	constructor(settings) {
		this._studytime = settings.timer;
		this._shortbreak = settings.shortBreak;
		this._longbreak = settings.longBreak;
		this._pomodoros = settings.pomodoros;
		this._notificationsEnabled = settings.notifications;
		this._volume = settings.volume;
		this._studyNotification = settings.timerNotification;
		this._sbNotification = settings.sbNotification;
		this._lbNotification = settings.lbNotification;
		this._autorunEnabled = settings.autorun;
		this._darkModeEnabled = settings.darkMode;
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

	get darkModeEnabled() {
		return this._darkModeEnabled;
	}
}