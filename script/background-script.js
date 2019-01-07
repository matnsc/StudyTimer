let settings = new UserSettings( 4, "00:30", "00:30", "30:00" );

let timer    = new StudyTimer( TimerFormat.formatTextToMil( settings.studytime ), 0 );

let badge    = new Badge( timer.badgeColor );

function getCompletedPomodoros() {
	
	return timer.completedPomodoros;
	
}

function getPlaying() {
	
	return timer.playing;
	
}

function getTime() {
	
	return TimerFormat.formatMilToText( timer.time );
	
}

function getTimerType() {
	
	return timer.type;
	
}

function play() {
	
	return timer.play();
	
}

function pause() {
	
	return timer.pause();
	
}

function reset() {
	
	timer.pause();
	badge.updateText( null );
	timer = new StudyTimer( TimerFormat.formatTextToMil( settings.studytime ), 0 );
	
}

function init() {
	
	setInterval( function() {
		
		if( timer.playing ) {
			
			dueTimeVerifier( timer.update() );
			
		}
		
	}, 200 );
	
}

function dueTimeVerifier( value ) {
	
	if( value <= 0 ) {
		
		timer = timer.change( settings );
		
		badge.updateColor( timer.badgeColor );
		
		timer.showNotification();
		
		timer.play();
		
	}
	
	if( value > 0 ) {
		
		badge.updateText( TimerFormat.formatMilToMinuteText( value ).toString() );
		
	}
	
}
