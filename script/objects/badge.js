class Badge {
	
	updateText( value ) {
		
		browser.browserAction.setBadgeText( { text: value } );
		
	}

	updateColor( value ) {
		
		browser.browserAction.setBadgeBackgroundColor( { color: value } );
		
	}

}