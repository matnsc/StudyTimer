const connection = chrome.runtime.connect({
	name: "background-popup"
});

const interfaceService = new InterfaceService();

const sendMessageToBackground = (message) => {
	connection.postMessage({
		"action": message
	});
}

connection.onMessage.addListener((message) => {
	if (!message.timer) return;

	const timer = message.timer;

	interfaceService.updateButtonState(timer.playing);
	interfaceService.updateTimerValues(timer.completedPomodoros, timer.type, timer.time);
	interfaceService.updateProgressCircle(timer.total, timer.time, timer.color);
});

document.getElementById("settings").addEventListener("click", () => {
	chrome.tabs.create({
		url: "../options/options.html"
	});
});

document.getElementById("reset").addEventListener("click", () => {
	sendMessageToBackground("reset");
});

document.getElementById("play").addEventListener("click", () => {
	sendMessageToBackground("play");
});

document.getElementById("pause").addEventListener("click", () => {
	sendMessageToBackground("pause");
});

window.onload = () => {
	sendMessageToBackground("init");
};