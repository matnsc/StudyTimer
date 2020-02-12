class ShortBreakTimer extends Timer {

	constructor(time, completedPomodoros) {

		super(time, completedPomodoros);

		this._badgeColor = "#006504";
		this._notificationMessage = "It's time to take a break.";
		this._notificationImage = "../icons/breakIcon.png";
		this._type = "Short Break";

	}

	showNotification() {

		new Notification("Short break", this._notificationMessage, this._notificationImage).show();

	}

	change(settings) {

		return new StudyTimer(TimerFormat.textToMilliseconds(settings.studytime), this._completedPomodoros);

	}

}