class UserSettings {

	constructor(pomodoros, studytime, shortbreak, longbreak, notificationsEnabled, volume) {

		this._pomodoros = pomodoros;
		this._studytime = studytime;
		this._shortbreak = shortbreak;
		this._longbreak = longbreak;
		this._notificationsEnabled = notificationsEnabled;
		this._volume = volume;

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
}