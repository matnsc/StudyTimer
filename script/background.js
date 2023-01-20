const settingsStorage = new UserSettingsStorage();
let timer = new StudyTimer(TimerFormat.textToMilliseconds(settingsStorage.settings.timer), 0, settingsStorage.settings);
let activated = false;
let sendFunction;
let interval;
const badge = new Badge(timer.badgeColor);

const saveSession = () => {
	if (settingsStorage.settings.saveSession) {
		settingsStorage.session = timer;
	}
}

const dueTimeVerifier = (value) => {
	if (value <= 0) {
		timer = timer.change(settingsStorage.settings);
		saveSession();
		badge.updateColor(timer.badgeColor);

		timer.showNotification();
		timer.play();
	}

	if (value > 0) {
		badge.updateText(TimerFormat.millisecondsToMinutes(value - 990).toString());
	}
};

const update = () => {
	if (timer.playing) {
		dueTimeVerifier(timer.update());
	}

	if (!sendFunction) return;
	sendFunction();
};

const activate = () => {
	if (activated) return;

	update();
	interval = setInterval(() => {
		update();
	}, 200);

	activated = true;
};

const deactivate = () => {
	if (!activated) return;

	clearInterval(interval);

	activated = false;
};

chrome.runtime.onConnect.addListener((connection) => {
	const sendMessageToPopup = (message) => {
		try {
			connection.postMessage({
				"timer": message
			});
		} catch (error) {}
	};

	sendFunction = () => {
		sendMessageToPopup({
			playing: timer.playing,
			completedPomodoros: timer.completedPomodoros,
			type: timer.type,
			time: TimerFormat.millisecondsToText(timer.time),
			total: TimerFormat.millisecondsToText(timer.total),
			color: timer.badgeColor
		})
	};

	connection.onMessage.addListener((message) => {
		if (!message.action) return;

		const commands = {
			play() {
				timer.play();
				activate();
			},

			pause() {
				timer.pause();
				deactivate();
				update();
			},

			reset() {
				deactivate();
				timer = new StudyTimer(TimerFormat.textToMilliseconds(settingsStorage.settings.timer), 0, settingsStorage.settings);
				saveSession();
				badge.updateText("");
				badge.updateColor(timer.badgeColor);
				update();
			},

			init() {
				update();
			}
		}

		const executeCommand = commands[message.action];

		if (executeCommand) {
			executeCommand();
		}
	});
});

const setTimer = (value) => {
	value._time = value._time - 990;
	if (value._type == "Task") {
		timer = new StudyTimer(value._time, value._completedPomodoros, settingsStorage.settings);
	}

	if (value._type == "Short Break") {
		timer = new ShortBreakTimer(value._time, value._completedPomodoros, settingsStorage.settings);
	}

	if (value._type == "Long Break") {
		timer = new LongBreakTimer(value._time, value._completedPomodoros, settingsStorage.settings);
	}
	badge.updateColor(timer.badgeColor);
}

if (settingsStorage.settings.saveSession && settingsStorage.session) {
	setTimer(settingsStorage.session);
}

if (settingsStorage.settings.autorun) {
	timer.play();
	activate();
}