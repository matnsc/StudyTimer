class LongBreakTimer extends Timer {
	
	constructor( time, completedPomodoros ) {
		
		super( time, completedPomodoros );
		
		this._badgeColor          = "#0060df";
		this._notificationMessage = "You completed the pomodoro cycle! Enjoy your longer break.";
		this._notificationImage   = "../icons/breakIcon.png";
		this._type                = "Long Break";
		
	}
	
	showNotification() {
		
		new Notification( "Long Break Time!", this._notificationMessage, this._notificationImage ).show();
		
	}
	
	change( settings ) {
		
		return new StudyTimer( TimerFormat.textToMilliseconds( settings.studytime ), 0 );
		
	}
	
}