class Notification {
	constructor(title, message, image) {
		this._title = title;
		this._message = message;
		this._image = image;
		this._alert = new Audio("../sounds/notification.ogg");
	}

	show() {
		this._createNotification();
		this._playNotificationAlert();
	}

	_createNotification() {
		const settingsStorage = new UserSettingsStorage();

		if (settingsStorage.settings.notificationsEnabled == "true") {
			chrome.notifications.create({

				"type": "basic",
				"iconUrl": chrome.runtime.getURL(this._image),
				"title": this._title,
				"message": this._message

			});
		}
	}

	_playNotificationAlert() {
		const settingsStorage = new UserSettingsStorage();
		let volume = parseInt(settingsStorage.settings.volume);
		(volume > 0) ? volume /= 100 : 0;

		this._alert.volume = volume;
		this._alert.currentTime = 0;
		this._alert.play();
	}
}