const interfaceService = new InterfaceService();

const sendMessageToBackground = (message) => {

	chrome.runtime.sendMessage({
		"action": message
	});

}

chrome.runtime.onMessage.addListener((message) => {

	if (!message.timer) return;

	const timer = message.timer;

	interfaceService.updateButtonState(timer.playing);

	interfaceService.updateTimerValues(timer.completedPomodoros, timer.timerType, timer.time);

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