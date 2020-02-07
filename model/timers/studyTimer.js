class StudyTimer extends Timer {

	constructor(time, completedPomodoros) {

		super(time, completedPomodoros);

		this._badgeColor = "#737373";
		this._notificationMessage = "Your break is over. Back to work!";
		this._notificationImage = "../icons/studyIcon.png";
		this._type = "Study";

	}

	showNotification() {

		new Notification("Study Time", this._notificationMessage, this._notificationImage).show();

	}

	change(settings) {

		let breakTimer;

		this._completedPomodoros++;

		if (this._completedPomodoros < settings.pomodoros) {

			breakTimer = new ShortBreakTimer(TimerFormat.textToMilliseconds(settings.shortbreak), this._completedPomodoros);

		} else {

			breakTimer = new LongBreakTimer(TimerFormat.textToMilliseconds(settings.longbreak), 0);

		}

		return breakTimer;

	}

}