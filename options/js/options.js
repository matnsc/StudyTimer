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

const timerTab = document.getElementById("timerTab");
const notificationTab = document.getElementById("notificationTab");

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
		const study = TimerFormat.minutesAndSecondsToText(studyClockLine.getElementsByClassName("minutes")[0].value, studyClockLine.getElementsByClassName("seconds")[0].value);
		const shortBreak = TimerFormat.minutesAndSecondsToText(shortBreakClockLine.getElementsByClassName("minutes")[0].value, shortBreakClockLine.getElementsByClassName("seconds")[0].value);
		const longBreak = TimerFormat.minutesAndSecondsToText(longBreakClockLine.getElementsByClassName("minutes")[0].value, longBreakClockLine.getElementsByClassName("seconds")[0].value);
		const pomodoros = pomodorosInput.value;
		const notificationsEnabled = document.getElementById("notificationAreaOpt").checked;
		const volumeValue = document.getElementById("volume").value;
		const studyNotification = document.getElementById("studyNotification").value;
		const sbNotification = document.getElementById("sbNotification").value;
		const lbNotification = document.getElementById("lbNotification").value;
		const autorunEnabled = document.getElementById("autorunOpt").checked;

		settingStorage.settings = new UserSettings(pomodoros, study, shortBreak, longBreak, notificationsEnabled, volumeValue, studyNotification, sbNotification, lbNotification, autorunEnabled);

		updateInputs();
		sendMessageToBackground("reset");
	});

	document.getElementById("resetButton").addEventListener("click", () => {
		settingStorage.settings = settingStorage.default();
		updateInputs();
		sendMessageToBackground("reset");
	});

	timerTab.addEventListener("click", (e) => {
		e.preventDefault();
		document.getElementById("timer").style.display = "block";
		document.getElementById("notification").style.display = "none";
		timerTab.classList.add("active");
		notificationTab.classList.remove("active");
	});

	notificationTab.addEventListener("click", (e) => {
		e.preventDefault();
		document.getElementById("timer").style.display = "none";
		document.getElementById("notification").style.display = "block";
		timerTab.classList.remove("active");
		notificationTab.classList.add("active");
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
}

window.onload = () => {
	updateInputs();
	addListeners();
};