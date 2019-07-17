const settingStorage = new UserSettingsStorage();
let   settings       = settingStorage.userSettings || ( settingStorage.userSettings = new UserSettings( 4, "25:00", "05:00", "30:00" ) );

let   timer = new StudyTimer( TimerFormat.formatTextToMil( settings.studytime ), 0 );
const badge = new Badge( timer.badgeColor );

const sound = new Audio("../sounds/notification.ogg");

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
	
	timer = new StudyTimer( TimerFormat.formatTextToMil( settings.studytime ), 0 );
	badge.updateText( null );
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
		
		sound.pause();

		sound.currentTime = 0;

		sound.play();

		timer = timer.change( settings );
		
		badge.updateColor( timer.badgeColor );
		
		timer.showNotification();

		timer.play();
		
	}
	
	if( value > 0 ) {
		
		badge.updateText( TimerFormat.formatMilToMinuteText( value ).toString() );
		
	}
	
}

function updateSettings() {

	settings = settingStorage.userSettings;
	timer = new StudyTimer( TimerFormat.formatTextToMil( settings.studytime ), 0 );
	badge.updateText( null );
	badge.updateColor( timer.badgeColor );

}
