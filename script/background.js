const settingsStorage = new UserSettingsStorage();
let timer = new StudyTimer(TimerFormat.textToMilliseconds(settingsStorage.settings.studytime), 0);
const badge = new Badge(timer.badgeColor);

chrome.extension.onConnect.addListener((connection) => {

	const sendMessageToPopup = (message) => {

		try {

			connection.postMessage({
				"timer": message
			});

		} catch (error) {}

	}

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
	}

	const update = () => {

		if (timer.playing) {

			dueTimeVerifier(timer.update());

		}

		sendMessageToPopup({

			playing: timer.playing,
			completedPomodoros: timer.completedPomodoros,
			type: timer.type,
			time: TimerFormat.millisecondsToText(timer.time)

		});

	}

	connection.onMessage.addListener((message) => {

		if (!message.action) return;

		const commands = {

			play() {

				timer.play();

			},

			pause() {

				timer.pause();

			},

			reset() {

				timer = new StudyTimer(TimerFormat.textToMilliseconds(settingsStorage.settings.studytime), 0);
				badge.updateText("");
				badge.updateColor(timer.badgeColor);

			},

			init() {

				update();

				setInterval(() => {

					update();

				}, 200);

			}

		}

		const executeCommand = commands[message.action];

		if (executeCommand) {

			executeCommand();

		}

	});

})