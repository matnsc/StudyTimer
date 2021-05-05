controller.timer = timer.create();
badge.update({ color: controller.timer.badge.color });

chrome.runtime.onConnect.addListener((connection) => {
	const sendMessageToPopup = (message) => {
		try {
			connection.postMessage({
				"timer": message
			});
		} catch (error) {}
	}

	const dueTimeVerifier = (value) => {
		if (value <= 0) {
			controller.timer = controller.change(controller.timer, settings.get());
			controller.timer.play();

			notification.show({ title: controller.timer.type, ...controller.timer.notification });
			badge.update({ color: controller.timer.badge.color });
		}

		if (value > 0) {
			badge.update({ text: TimerFormat.millisecondsToMinutes(value) });
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