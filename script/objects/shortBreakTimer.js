class ShortBreakTimer extends Timer {
	
	constructor( time, completedPomodoros ) {
		
		super( time, completedPomodoros );
		
		this._badgeColor 		  = "#006504";
		this._notificationMessage = "It's time to take a break and do other things.\n\nIf you are really busy and can't stop right now, you can pause the clock meanwhile.";
		this._notificationImage   = "../icons/breakIcon.png";
		this._type = "Short Break";
		
	}
	
	get badgeColor() {
		
		return this._badgeColor;
		
	}
	
	showNotification() {
		
		new Notification( "Short Break Time", this._notificationMessage, this._notificationImage ).show();
		
	}
	
	change( settings ) {
		
		return new StudyTimer( TimerFormat.formatTextToMil( settings.studytime ), this._completedPomodoros );
		
	}
	
}