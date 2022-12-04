const connection = chrome.runtime.connect({
	name: "background-settings"
});

const settingStorage = new UserSettingsStorage();

const minutesInputs = Array.from(document.getElementsByClassName("minutes"));
const secondsInputs = Array.from(document.getElementsByClassName("seconds"));
const pomodorosInput = document.getElementById("numberPomodoros");

const studyClockLine = document.getElementById("study");
const shortBreakClockLine = document.getElementById("shortBreak");
const longBreakClockLine = document.getElementById("longBreak");

const tabs = Array.from(document.getElementsByClassName("tab"));

const volume = document.getElementById("volume");
const volumeSpan = document.getElementById("volumeSpan");

const studyNotification = document.getElementById("studyNotification");
const sbNotification = document.getElementById("sbNotification");
const lbNotification = document.getElementById("lbNotification");

const sendMessageToBackground = (message) => {
	connection.postMessage({
		"action": message
	});
}

const addListeners = () => {
	document.getElementById("timer").addEventListener("keypress", (keyEvent) => {
		const keyPressed = new Key(keyEvent.key);
		const isValid = !keyPressed.isNumber() && !keyPressed.isSpecial() && !keyPressed.isDirectional();

		isValid && keyEvent.preventDefault();
	});

	[...minutesInputs, ...secondsInputs].map(input => {
		input.addEventListener("focusout", function () {
			const minutesInput = this.parentElement.getElementsByClassName("minutes")[0];
			const secondsInput = this.parentElement.getElementsByClassName("seconds")[0];

			InterfaceService.preventBothClocksBeingZero(minutesInput, secondsInput);
		});
	});

	minutesInputs.map(input => {
		input.addEventListener("focusout", () => input.value = new MinutesInput(input.value).format());
	});

	secondsInputs.map(input => {
		input.addEventListener("focusout", () => input.value = new SecondsInput(input.value).format());
	});

	pomodorosInput.addEventListener("focusout", () => pomodorosInput.value = new PomodorosInput(pomodorosInput.value).format());

	volume.addEventListener("input", () => volumeSpan.innerHTML = volume.value + "%");

	document.getElementById("saveButton").addEventListener("click", () => {
		const settings = {
			timer: TimerFormat.minutesAndSecondsToText(studyClockLine.getElementsByClassName("minutes")[0].value, studyClockLine.getElementsByClassName("seconds")[0].value),
			shortBreak: TimerFormat.minutesAndSecondsToText(shortBreakClockLine.getElementsByClassName("minutes")[0].value, shortBreakClockLine.getElementsByClassName("seconds")[0].value),
			longBreak: TimerFormat.minutesAndSecondsToText(longBreakClockLine.getElementsByClassName("minutes")[0].value, longBreakClockLine.getElementsByClassName("seconds")[0].value),
			pomodoros: pomodorosInput.value,
			notifications: document.getElementById("notificationAreaOpt").checked,
			volume: document.getElementById("volume").value,
			timerNotification: document.getElementById("studyNotification").value,
			sbNotification: document.getElementById("sbNotification").value,
			lbNotification: document.getElementById("lbNotification").value,
			autorun: document.getElementById("autorunOpt").checked,
			darkMode: document.getElementById("darkOpt").checked
		}

		settingStorage.settings = new UserSettings(settings);

		updateInputs();
		sendMessageToBackground("reset");
	});

	document.getElementById("resetButton").addEventListener("click", () => {
		settingStorage.settings = settingStorage.default();
		updateInputs();
		sendMessageToBackground("reset");
	});

	// Highlight clicked tab and show its content
	tabs.map(function(tab) {
		tab.addEventListener("click", function(e) {
			e.preventDefault();
			e.target.classList.add("active");
			document.getElementById(e.target.getAttribute("for")).classList.remove("hide");
			tabs.filter(x => x != tab).map(y => {
				y.classList.remove("active");
				document.getElementById(y.getAttribute("for")).classList.add("hide");
			});
		});
	});
}

const updateInputs = () => {
	InterfaceService.updateClockLine(studyClockLine, settingStorage.settings.studytime);
	InterfaceService.updateClockLine(shortBreakClockLine, settingStorage.settings.shortbreak);
	InterfaceService.updateClockLine(longBreakClockLine, settingStorage.settings.longbreak);
	InterfaceService.updatePomodoros(settingStorage.settings.pomodoros);
	InterfaceService.updateNotificationOption(settingStorage.settings.notificationsEnabled);
	InterfaceService.updateVolume(settingStorage.settings.volume);
	InterfaceService.updateNotificationMessage(studyNotification, settingStorage.settings.studyNotification);
	InterfaceService.updateNotificationMessage(sbNotification, settingStorage.settings.sbNotification);
	InterfaceService.updateNotificationMessage(lbNotification, settingStorage.settings.lbNotification);
	InterfaceService.updateAutorunOption(settingStorage.settings.autorunEnabled);
	InterfaceService.updateDarkModeOption(settingStorage.settings.darkModeEnabled);
}

window.onload = () => {
	updateInputs();
	addListeners();
};