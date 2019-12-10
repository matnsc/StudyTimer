class Notification {
	
	constructor( title, message, image ) {
		
		this._title   = title;
		this._message = message;
		this._image   = image;
		this._alert   = new Audio("../sounds/notification.ogg");

	}
	
	show() {
		
		this._createNotification();
		this._playNotificationAlert();
		
	}
	
	_createNotification() {
		
		chrome.notifications.create( {
			
			"type"	  : "basic",
			"iconUrl" : chrome.extension.getURL( this._image ),
			"title"   : this._title,
			"message" : this._message
				
		} );
		
	}
	
	_playNotificationAlert() {

		this._alert.currentTime = 0;

		this._alert.play();

	}

}