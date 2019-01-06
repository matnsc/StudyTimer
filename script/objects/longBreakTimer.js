class LongBreakTimer extends Timer {
	
	constructor( time, completedPomodoros ) {
		
		super( time, completedPomodoros );
		
		this._badgeColor 		  = "#0060df";
		this._notificationMessage = "You completed the pomodoro cycle! Now is time for the long break. Enjoy.";
		this._notificationImage   = "../icons/breakIcon.png";
		this._type = "Long Break";
		
	}
	
	get badgeColor() {
		
		return this._badgeColor;
		
	}
	
	showNotification() {
		
		new Notification( "Long Break Time!", this._notificationMessage, this._notificationImage ).show();
		
	}
	
	change( settings ) {
		
		return new StudyTimer( TimerFormat.formatTextToMil( settings.studytime ), 0 );
		
	}
	
}