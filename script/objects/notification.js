class Notification {
	
	constructor( title, message, image ) {
		
		this._title   = title;
		this._message = message;
		this._image   = image;
		
	}
	
	show() {
		
		this._create( this._title, this._message, this._image );
		
	}
	
	_create( title, message, image ) {
		
		browser.notifications.create( {
			
			"type"	  : "basic",
			"iconUrl" : browser.extension.getURL( image ),
			"title"   : title,
			"message" : message
				
		} );
		
	}
	
}