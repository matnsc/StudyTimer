class StudyTimer extends Timer {
	constructor(time, completedPomodoros, settings) {
		super(time, completedPomodoros);

		this._badgeColor = "#677689";
		this._notificationMessage = settings.timerNotification;
		this._notificationImage = "../icons/studyIcon.png";
		this._type = "Task";
	}

	showNotification() {
		new Notification("Task", this._notificationMessage, this._notificationImage).show();
	}

	change(settings) {
		let breakTimer;
		this._completedPomodoros++;

		if (this._completedPomodoros < settings.pomodoros) {
			breakTimer = new ShortBreakTimer(TimerFormat.textToMilliseconds(settings.shortBreak), this._completedPomodoros, settings);
		} else {
			breakTimer = new LongBreakTimer(TimerFormat.textToMilliseconds(settings.longBreak), this._completedPomodoros, settings);
		}

		return breakTimer;
	}
}