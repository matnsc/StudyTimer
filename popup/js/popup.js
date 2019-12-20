const timerController  = chrome.extension.getBackgroundPage();
const interfaceService = new InterfaceService();

document.getElementById( "settings" ).addEventListener( "click", function() {

	chrome.tabs.create( { url: "../options/options.html" } );

} );

function init() {
	
	timerController.init();
	clickListener();
	
}

function clickListener() {
	
	document.addEventListener( "click", ( e ) => {
		
		const action = e.target.getAttribute( "id" );

		sendMessageToBackground(action);

	} );
	
}

function sendMessageToBackground(message) {

	chrome.runtime.sendMessage({ "action": message });

}

chrome.runtime.onMessage.addListener((message) => {

	if (!message.timer) return;

	const timer = message.timer;

	interfaceService.updateButtonState( timer.playing );
	
	interfaceService.updateTimerValues( timer.completedPomodoros, timer.timerType, timer.time );

});

window.onload = init;