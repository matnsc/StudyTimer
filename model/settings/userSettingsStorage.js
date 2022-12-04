class UserSettingsStorage {
    constructor() {
        this._localStorage = window.localStorage;
    }

    default() {
        const studyNotification = "Your break is over. Back to work!";
        const sbNotification = "It's time to take a break.";
        const lbNotification = "You completed the pomodoro cycle! Enjoy your longer break.";
        
        const settings = {
			timer: "25:00",
			shortBreak: "05:00",
			longBreak: "30:00",
			pomodoros: 4,
			notifications: "true",
			volume: 50,
			timerNotification: studyNotification,
			sbNotification: sbNotification,
			lbNotification: lbNotification,
			autorun: "false",
			darkMode: "true"
		}

        return new UserSettings(settings);
    }

    get settings() {
        const defaultObj = this.default();

        const settings = {
			timer: this._getItem("studytime") ?? defaultObj.studytime,
			shortBreak: this._getItem("shortbreak") ?? defaultObj.shortbreak,
			longBreak: this._getItem("longbreak") ?? defaultObj.longbreak,
			pomodoros: this._getItem("pomodoros") ?? defaultObj.pomodoros,
			notifications: this._getItem("notificationAreaOpt") ?? defaultObj.notificationsEnabled,
			volume: this._getItem("volume") ?? defaultObj.volume,
			timerNotification: this._getItem("studyNotification") ?? defaultObj.studyNotification,
			sbNotification: this._getItem("sbNotification") ?? defaultObj.sbNotification,
			lbNotification: this._getItem("lbNotification") ?? defaultObj.lbNotification,
			autorun: this._getItem("autorunEnabled") ?? defaultObj.autorunEnabled,
			darkMode: this._getItem("darkModeEnabled") ?? defaultObj.darkModeEnabled
		}

        return new UserSettings(settings);
    }

    set settings(userSettings) {
        this._setItem("pomodoros", userSettings.pomodoros);
        this._setItem("studytime", userSettings.studytime);
        this._setItem("shortbreak", userSettings.shortbreak);
        this._setItem("longbreak", userSettings.longbreak);
        this._setItem("notificationAreaOpt", userSettings.notificationsEnabled);
        this._setItem("volume", userSettings.volume);
        this._setItem("studyNotification", userSettings.studyNotification);
        this._setItem("sbNotification", userSettings.sbNotification);
        this._setItem("lbNotification", userSettings.lbNotification);
        this._setItem("autorunEnabled", userSettings.autorunEnabled);
        this._setItem("darkModeEnabled", userSettings.darkModeEnabled);
        
        return this.settings;
    }

    _getItem(name) {
        return this._localStorage.getItem(name);
    }

    _setItem(name, value) {
        this._localStorage.setItem(name, value);
    }
}