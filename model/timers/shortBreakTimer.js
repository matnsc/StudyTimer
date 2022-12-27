class ShortBreakTimer extends Timer {
	constructor(time, completedPomodoros, settings) {
		super(time, completedPomodoros);

		this._badgeColor = "#0f7b38";
		this._notificationMessage = settings.sbNotification;
		this._notificationImage = "../icons/breakIcon.png";
		this._type = "Short Break";
	}

	showNotification() {
		new Notification("Short break", this._notificationMessage, this._notificationImage).show();
	}

	change(settings) {
		return new StudyTimer(TimerFormat.textToMilliseconds(settings.studytime), this._completedPomodoros, settings);
	}
}