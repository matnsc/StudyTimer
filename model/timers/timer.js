class Timer {

	constructor(time, completedPomodoros) {

		this._time = time;
		this._completedPomodoros = completedPomodoros;

		this._init = new Date().getTime();
		this._endtime = this._init + this._time;
		this._playing = false;

		this._badgeColor = "";
		this._type = "";

	}

	get badgeColor() {

		return this._badgeColor;

	}

	get completedPomodoros() {

		return this._completedPomodoros;

	}

	get playing() {

		return this._playing;

	}

	get type() {

		return this._type;

	}

	get time() {

		return this._time;

	}

	set time(value) {

		this._time = value;

	}

	play() {

		this._playing = true;
		this._init = new Date().getTime();
		this._endtime = this._init + this._time;

	}

	pause() {

		this._playing = false;

	}

	update() {

		if (this._playing) {

			const now = new Date().getTime();

			if (now <= this._endtime) {

				this._time = this._endtime - now;

			} else {

				this._time = 0;

			}

		}

		return this._time;

	}

}