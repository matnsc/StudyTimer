//default settings
var settings   = new UserSettings( 4, "25:00", "05:00", "30:00" );
browser.browserAction.setBadgeBackgroundColor( { color: "#737373" } );

//global variables
var actualTime = settings.studytime;
var playing    = false;
var timer 	   = null;
var timerState = "Study";
var completedPomodoros = 0;

function setStudyTime() {
	
	actualTime = settings.studytime;
	browser.browserAction.setBadgeBackgroundColor( { color: "#737373" } );
	
}

function setShortBreak() {
	
	actualTime = settings.shortbreak;
	browser.browserAction.setBadgeBackgroundColor( { color: "#006504" } );
	
}

function setLongBreak() {
	
	actualTime = settings.longbreak;
	browser.browserAction.setBadgeBackgroundColor( { color: "#0060df" } );
	
}

function play() {
	
	var mil  = TimerFormat.formatTextToMil( actualTime );
	timer 	 = new Timer( mil );
	playing  = true;
	
}

function pause() {
	
	playing = false;
	
}

function reset() {
	
	completedPomodoros = 0;
	timerState = "Study";
	pause();
	updateBadge( null );
	setStudyTime();
	
}

function backgroundTimer() {
	
	setInterval( function() {
		
		if( playing ) {
		
			var timeLeft = timer.update();
			
			dueTimeVerifier( timeLeft );
			
			actualTime = TimerFormat.formatMilToText( timeLeft );
			
		}
		
	}, 200 );
	
}

function dueTimeVerifier( value ) {
	
	if( value <= 0 ) {
		
		changeTimer();
		
		showNotification();
		
		play();
		
	}
	
	if( value > 0 ) {
		
		updateBadge( TimerFormat.formatMilToMinuteText( value ).toString() );
		
	}
	
}

function changeTimer() {
	
	if( timerState == "Study" ) {
			
		completedPomodoros++;
		
		if( completedPomodoros < settings.pomodoros ) {
			
			timerState = "Short Break";
			
			setShortBreak();
			
		} else {
			
			completedPomodoros = 0;
			timerState = "Long Break";
			
			setLongBreak();
			
		}
		
	} else if( timerState == "Short Break" || timerState == "Long Break" ) {

		timerState = "Study";
		
		setStudyTime();
		
	}
	
}

function updateBadge( value ) {
	
	browser.browserAction.setBadgeText( { text: value } );
	
}

function showNotification() {
	
	switch ( timerState ) {
			
		case "Short Break":
		
			var message = "It's time to take a break and do other things.\n\nIf you are really busy and can't stop right now, you can pause the clock meanwhile.";
	
			var notificationImage = "../icons/breakIcon.png";
			
			createNotification( "Short Break Time", message, notificationImage );
			
			break;
		
		case "Long Break":
			
			var message = "You completed the pomodoro cycle! Now is time for the long break. Enjoy.";
			
			var notificationImage = "../icons/breakIcon.png";
			
			createNotification( "Long Break Time!", message, notificationImage );
			
			break;
			
		case "Study":
		
			var message = "Your time to rest has ended.\nGo back to work!";
			
			var notificationImage = "../icons/studyIcon.png";
			
			createNotification( "Study Time", message, notificationImage );
			
			break;
	}
	
}

function createNotification( title, message, notificationImage ) {
	
	browser.notifications.create( {
			
		"type"	  : "basic",
		"iconUrl" : browser.extension.getURL( notificationImage ),
		"title"   : title,
		"message" : message
			
	} );
	
}