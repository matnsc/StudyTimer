const settingsStorage = new UserSettingsStorage();
let timer = new StudyTimer(TimerFormat.textToMilliseconds(settingsStorage.settings.studytime), 0, settingsStorage.settings);
let activated = false;
let sendFunction;
let interval;
const badge = new Badge(timer.badgeColor);

const dueTimeVerifier = (value) => {
	if (value <= 0) {
		timer = timer.change(settingsStorage.settings);

		badge.updateColor(timer.badgeColor);

		timer.showNotification();
		timer.play();
	}

	if (value > 0) {
		badge.updateText(TimerFormat.millisecondsToMinutes(value).toString());
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

if (settingsStorage.settings.autorunEnabled === "true") {
	timer.play();
	activate();
}

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
			time: TimerFormat.millisecondsToText(timer.time)
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
				timer = new StudyTimer(TimerFormat.textToMilliseconds(settingsStorage.settings.studytime), 0, settingsStorage.settings);
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