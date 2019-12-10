const settingStorage = new UserSettingsStorage();
let   timer = new StudyTimer( TimerFormat.textToMilliseconds( settingStorage.settings.studytime ), 0 );
const badge = new Badge( timer.badgeColor );

function getCompletedPomodoros() {
	
	return timer.completedPomodoros;
	
}

function getPlaying() {
	
	return timer.playing;
	
}

function getTime() {
	
	return TimerFormat.millisecondsToText( timer.time );
	
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
	
	timer = new StudyTimer( TimerFormat.textToMilliseconds( settingStorage.settings.studytime ), 0 );
	badge.updateText( "" );
	badge.updateColor( timer.badgeColor );
	
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
		
		timer = timer.change( settingStorage.settings );
		
		badge.updateColor( timer.badgeColor );
		
		timer.showNotification();

		timer.play();
		
	}
	
	if( value > 0 ) {
		
		badge.updateText( TimerFormat.millisecondsToMinutes( value ).toString() );
		
	}
	
}

function updateSettings() {

	timer = new StudyTimer( TimerFormat.textToMilliseconds( settingStorage.settings.studytime ), 0 );
	badge.updateText( "" );
	badge.updateColor( timer.badgeColor );

}
