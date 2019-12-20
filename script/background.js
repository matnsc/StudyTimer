const settingStorage = new UserSettingsStorage();
let timer = new StudyTimer(TimerFormat.textToMilliseconds(settingStorage.settings.studytime), 0);
const badge = new Badge(timer.badgeColor);

function play() {

	return timer.play();

}

function pause() {

	return timer.pause();

}

function reset() {

	timer = new StudyTimer(TimerFormat.textToMilliseconds(settingStorage.settings.studytime), 0);
	badge.updateText("");
	badge.updateColor(timer.badgeColor);

}

function init() {

	setInterval(function () {

		if (timer.playing) {

			dueTimeVerifier(timer.update());

		}

		const popupIsOpened = chrome.extension.getViews({ type: "popup" }).length > 0;

		if (popupIsOpened) {

			sendMessageToPopup({

				playing: timer.playing,
				completedPomodoros: timer.completedPomodoros,
				timerType: timer.timerType,
				time: TimerFormat.millisecondsToText(timer.time)
				
			});

		}

	}, 200);

}

function dueTimeVerifier(value) {

	if (value <= 0) {

		timer = timer.change(settingStorage.settings);

		badge.updateColor(timer.badgeColor);

		timer.showNotification();

		timer.play();

	}

	if (value > 0) {

		badge.updateText(TimerFormat.millisecondsToMinutes(value).toString());

	}

}

function updateSettings() {

	timer = new StudyTimer(TimerFormat.textToMilliseconds(settingStorage.settings.studytime), 0);
	badge.updateText("");
	badge.updateColor(timer.badgeColor);

}

chrome.runtime.onMessage.addListener((message) => {

	if (!message.action) return;

	const commands = {

		play() {
			play();
		},

		pause() {
			pause();
		},

		reset() {
			reset();
		}

	}

	const executeCommand = commands[message.action];

	if (executeCommand) {
		
		executeCommand();

	}

});

function sendMessageToPopup(message) {

	chrome.runtime.sendMessage({ "timer": message });

}