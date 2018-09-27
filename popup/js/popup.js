var background = browser.extension.getBackgroundPage();

function init() {
	
	updateButtonState();
	background.backgroundTimer();
	interfaceUpdater();
	clickListener();
	
}

function updateButtonState() {
	
	var backgroundRunning = background.playing;
	
	if( backgroundRunning ) {
		
		document.getElementById( "play" ).setAttribute( "disabled", "disabled" );
		document.getElementById( "pause" ).removeAttribute( "disabled" );
		
	} else {
		
		document.getElementById( "pause" ).setAttribute( "disabled", "disabled" );
		document.getElementById( "play" ).removeAttribute( "disabled" );
		
	}
	
}

function interfaceUpdater() {
	
	interfaceUpdate( background.completedPomodoros, background.timerState, background.actualTime );

	setInterval( function() {
		
		interfaceUpdate( background.completedPomodoros, background.timerState, background.actualTime );
		
	}, 200 );
	
}

function interfaceUpdate( completedPomodoros, timerState, actualTime ) {
	
	htmlElementUpdate( "pomodoroNumber", completedPomodoros );
	
	htmlElementUpdate( "caption", timerState );
	
	htmlElementUpdate( "clock", actualTime );
	
}

function htmlElementUpdate( id, value ) {
	
	document.getElementById( id ).innerHTML = value;
	
}

function clickListener() {
	
	document.addEventListener( "click", ( e ) => {
		
		var id = e.target.getAttribute( "id" );
		
		if( id == "play"){
			
			background.play();
			
		} else if( id == "pause" ) {
			
			background.pause();
			
		} else if( id == "reset" ) {
			
			background.reset();
			
			interfaceUpdate( background.completedPomodoros, background.timerState, background.actualTime );
			
		}
		
		updateButtonState();
		
	})
	
}

window.onload = init;