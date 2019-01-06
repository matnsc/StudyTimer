let background = browser.extension.getBackgroundPage();

function init() {
	
	updateButtonState();
	background.backgroundTimer();
	interfaceUpdater();
	clickListener();
	
}

function updateButtonState() {
	
	let backgroundRunning = background.timer.playing;
	
	if( backgroundRunning ) {
		
		document.getElementById( "play" ).setAttribute( "disabled", "disabled" );
		document.getElementById( "pause" ).removeAttribute( "disabled" );
		
	} else {
		
		document.getElementById( "pause" ).setAttribute( "disabled", "disabled" );
		document.getElementById( "play" ).removeAttribute( "disabled" );
		
	}
	
}

function interfaceUpdater() {
	
	interfaceUpdate( background.timer.completedPomodoros, background.timer.type, background.getActualTime() );

	setInterval( function() {
		
		interfaceUpdate( background.timer.completedPomodoros, background.timer.type, background.getActualTime() );
		
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
		
		let id = e.target.getAttribute( "id" );
		
		if( id == "play"){
			
			background.timer.play();
			
		} else if( id == "pause" ) {
			
			background.timer.pause();
			
		} else if( id == "reset" ) {
			
			background.reset();
			
			interfaceUpdate( background.timer.completedPomodoros, background.timer.type, background.getActualTime() );
			
		}
		
		updateButtonState();
		
	})
	
}

window.onload = init;