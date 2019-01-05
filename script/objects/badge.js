class Badge {
	
	constructor( studyColor, shortBreakColor, longBreakColor ) {
		
		this._studyColor 	  = studyColor;
		this._shortBreakColor = shortBreakColor;
		this._longBreakColor  = longBreakColor;
		
	}
	
	updateText( value ) {
		
		browser.browserAction.setBadgeText( { text: value } );
		
	}
	
	changeToStudyColor() {
		
		this._updateColor( this._studyColor );
		
	}
	
	changeToShortBreakColor() {
		
		this._updateColor( this._shortBreakColor );
		
	}
	
	changeToLongBreakColor() {
		
		this._updateColor( this._longBreakColor );
		
	}

	_updateColor( value ) {
		
		browser.browserAction.setBadgeBackgroundColor( { color: value } );
		
	}

}