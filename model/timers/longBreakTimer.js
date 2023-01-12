class LongBreakTimer extends Timer {
	constructor(time, completedPomodoros, settings) {
		super(time, completedPomodoros);

		this._badgeColor = "#0060df";
		this._notificationMessage = settings.lbNotification;
		this._notificationImage = "../icons/breakIcon.png";
		this._type = "Long Break";
	}

	showNotification() {
		new Notification("Long break", this._notificationMessage, this._notificationImage).show();
	}

	change(settings) {
		return new StudyTimer(TimerFormat.textToMilliseconds(settings.timer), 0, settings);
	}
}