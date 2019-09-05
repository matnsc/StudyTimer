const timerController  = browser.extension.getBackgroundPage();

document.getElementById( "settings" ).addEventListener( "click", function() {

	browser.tabs.create( { url: "../options/options.html" } );

} );

function init() {
	
	timerController.init()
	interfaceUpdater();
	clickListener();
	
}

function interfaceUpdater() {
	
	InterfaceService.updateButtonState( timerController.getPlaying() );
	
	InterfaceService.updateTimerValues( timerController.getCompletedPomodoros(), timerController.getTimerType(), timerController.getTime() );

	setInterval( function() {
		
		InterfaceService.updateTimerValues( timerController.getCompletedPomodoros(), timerController.getTimerType(), timerController.getTime() );
		
	}, 100 );
	
}

function clickListener() {
	
	document.addEventListener( "click", ( e ) => {
		
		const id = e.target.getAttribute( "id" );
		
		if( id == "play") {
			
			timerController.play();
			
		} else if( id == "pause" ) {
			
			timerController.pause();
			
		} else if( id == "reset" ) {
			
			timerController.reset();
			
		}
		
		InterfaceService.updateButtonState( timerController.getPlaying() );
		
	} );
	
}

window.onload = init;