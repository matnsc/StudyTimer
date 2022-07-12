class UserSettings {

	constructor(pomodoros, studytime, shortbreak, longbreak, soundEnabled, notificationsEnabled) {

		this._pomodoros = pomodoros;
		this._studytime = studytime;
		this._shortbreak = shortbreak;
		this._longbreak = longbreak;
		this._soundEnabled = soundEnabled;
		this._notificationsEnabled = notificationsEnabled;

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

	get soundEnabled() {

		return this._soundEnabled;

	}

	get notificationsEnabled() {

		return this._notificationsEnabled;

	}

	set pomodoros(pomodoros) {

		this._pomodoros = pomodoros;

	}

	set studytime(studytime) {

		this._studytime = studytime;

	}

	set shortbreak(shortbreak) {

		this._shortbreak = shortbreak;

	}

	set longbreak(longbreak) {

		this._longbreak = longbreak;

	}

	set soundEnabled(soundEnabled) {

		this._soundEnabled = soundEnabled;

	}

}