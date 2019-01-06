//objects
let settings = new UserSettings( 4, "00:30", "00:30", "30:00" );
let badge    = new Badge();

var timer = new StudyTimer( TimerFormat.formatTextToMil( settings.studytime ), 0 );

badge.updateColor( timer.badgeColor );

function getActualTime() {
	
	return TimerFormat.formatMilToText( timer.time );
	
}

function reset() {
	
	timer.pause();
	badge.updateText( null );
	timer = new StudyTimer( TimerFormat.formatTextToMil( settings.studytime ), 0 );
	
}

function backgroundTimer() {
	
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
