class Controller {

	constructor() {

		this._settingsStorage = new UserSettingsStorage();
		this._timer = new StudyTimer(TimerFormat.textToMilliseconds(this._settingsStorage.settings.studytime), 0);
		this._badge = new Badge(this._timer.badgeColor);

	}

	get play() {

		return this._timer.play();

	}

	get pause() {

		return this._timer.pause();

	}

	reset() {

		this._timer = new StudyTimer(TimerFormat.textToMilliseconds(this._settingsStorage.settings.studytime), 0);
		this._badge.updateText("");
		this._badge.updateColor(this._timer.badgeColor);

	}

	init() {

		this._update();

		setInterval(() => {

			this._update();
	
		}, 200);

	}

	_update() {

		if (this._timer.playing) {
	
			this._dueTimeVerifier(this._timer.update());

		}

		const popupIsOpened = chrome.extension.getViews({
			type: "popup"
		}).length > 0;

		if (popupIsOpened) {

			this._sendMessageToPopup({

				playing: this._timer.playing,
				completedPomodoros: this._timer.completedPomodoros,
				timerType: this._timer.timerType,
				time: TimerFormat.millisecondsToText(this._timer.time)

			});

		}

	}

	_dueTimeVerifier(value) {

		if (value <= 0) {

			this._timer = this._timer.change(this._settingsStorage.settings);
	
			this._badge.updateColor(this._timer.badgeColor);
	
			this._timer.showNotification();
	
			this._timer.play();
	
		}
	
		if (value > 0) {
	
			this._badge.updateText(TimerFormat.millisecondsToMinutes(value).toString());
	
		}
	}

	_sendMessageToPopup(message) {

		chrome.runtime.sendMessage({
			"timer": message
		});

	}

}

const controller = new Controller();

chrome.runtime.onMessage.addListener((message) => {

	if (!message.action) return;

	const commands = {

		play() {
			controller.play;
		},

		pause() {
			controller.pause;
		},

		reset() {
			controller.reset();
		},

		init() {
			controller.init();
		}

	}

	const executeCommand = commands[message.action];

	if (executeCommand) {

		executeCommand();

	}

});