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

});

const actionListener = () => {

	document.addEventListener("click", (e) => {

		const action = e.target.getAttribute("id");

		sendMessageToBackground(action);

	});

}

document.getElementById("settings").addEventListener("click", () => {

	chrome.tabs.create({
		url: "../options/options.html"
	});

});

window.onload = () => {

	sendMessageToBackground("init");
	actionListener();

};