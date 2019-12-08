const timerController  = chrome.extension.getBackgroundPage();
const interfaceService = new InterfaceService();

document.getElementById( "settings" ).addEventListener( "click", function() {

	chrome.tabs.create( { url: "../options/options.html" } );

} );

function init() {
	
	timerController.init();
	interfaceUpdater();
	clickListener();
	
}

function interfaceUpdater() {
	
	interfaceService.updateButtonState( timerController.getPlaying() );
	
	interfaceService.updateTimerValues( timerController.getCompletedPomodoros(), timerController.getTimerType(), timerController.getTime() );

	setInterval( function() {
		
		interfaceService.updateTimerValues( timerController.getCompletedPomodoros(), timerController.getTimerType(), timerController.getTime() );
		
	}, 100 );
	
}

function clickListener() {
	
	document.addEventListener( "click", ( e ) => {
		
		const id = e.target.getAttribute( "id" );
		
		const buttonActions = {

			play() {

				timerController.play();

			},

			pause() {

				timerController.pause();

			},

			reset() {

				timerController.reset();

			}

		}
		
		const executeAction = buttonActions[id];

		executeAction();

		interfaceService.updateButtonState( timerController.getPlaying() );
		
	} );
	
}

window.onload = init;