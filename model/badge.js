class Badge {
	
	constructor( initialColor ) {
		
		this.updateColor( initialColor );
		
	}
	
	updateText( value ) {
		
		browser.browserAction.setBadgeText( { text: value } );
		
	}

	updateColor( value ) {
		
		browser.browserAction.setBadgeBackgroundColor( { color: value } );
		
	}

}