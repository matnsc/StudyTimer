//default settings
let settings = new UserSettings( 4, "00:30", "00:30", "30:00" );
let badge    = new Badge( "#737373", "#006504", "#0060df" );

//global variables
var actualTime = settings.studytime;
var playing    = false;
var timer 	   = null;
var timerState = "Study";
var completedPomodoros = 0;

badge.changeToStudyColor();

function setStudyTime() {
	
	actualTime = settings.studytime;
	badge.changeToStudyColor();
	
}

function setShortBreak() {
	
	actualTime = settings.shortbreak;
	badge.changeToShortBreakColor();
	
}

function setLongBreak() {
	
	actualTime = settings.longbreak;
	badge.changeToLongBreakColor();
	
}

function play() {
	
	let mil  = TimerFormat.formatTextToMil( actualTime );
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
	badge.updateText( null );
	setStudyTime();
	
}

function backgroundTimer() {
	
	setInterval( function() {
		
		if( playing ) {
		
			let timeLeft = timer.update();
			
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
		
		badge.updateText( TimerFormat.formatMilToMinuteText( value ).toString() );
		
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

function showNotification() {
	
	let message;
	
	let notificationImage = timerState == "Study" ? "../icons/studyIcon.png" : "../icons/breakIcon.png";
	
	switch ( timerState ) {
			
		case "Short Break":
		
			message = "It's time to take a break and do other things.\n\nIf you are really busy and can't stop right now, you can pause the clock meanwhile.";
			
			createNotification( "Short Break Time", message, notificationImage );
			
			break;
		
		case "Long Break":
			
			message = "You completed the pomodoro cycle! Now is time for the long break. Enjoy.";
			
			createNotification( "Long Break Time!", message, notificationImage );
			
			break;
			
		case "Study":
		
			message = "Your time to rest has ended.\nGo back to work!";
			
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