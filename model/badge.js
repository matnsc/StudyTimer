class Badge {
	
	constructor( initialColor ) {
		
		this.updateColor( initialColor );
		
	}
	
	updateText( value ) {
		
		chrome.browserAction.setBadgeText( { text: value } );
		
	}

	updateColor( value ) {
		
		chrome.browserAction.setBadgeBackgroundColor( { color: value } );
		
	}

}