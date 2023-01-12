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
			notifications: true,
			volume: 50,
			timerNotification: studyNotification,
			sbNotification: sbNotification,
			lbNotification: lbNotification,
			autorun: false,
			darkMode: true,
            saveSession: false
		}

        return settings;
    }

    get settings() {
        const defaultObj = this.default();

        let settingsSaved = this._localStorage.getItem("settings");

        if (settingsSaved != null) {
            settingsSaved = JSON.parse(settingsSaved);
        } else {
            settingsSaved = this.default()
        }

        const settings = {
			timer: settingsSaved.timer ?? defaultObj.timer,
			shortBreak: settingsSaved.shortBreak ?? defaultObj.shortBreak,
			longBreak: settingsSaved.longBreak ?? defaultObj.longBreak,
			pomodoros: settingsSaved.pomodoros ?? defaultObj.pomodoros,
			notifications: settingsSaved.notifications ?? defaultObj.notifications,
			volume: settingsSaved.volume ?? defaultObj.volume,
			timerNotification: settingsSaved.timerNotification ?? defaultObj.timerNotification,
			sbNotification: settingsSaved.sbNotification ?? defaultObj.sbNotification,
			lbNotification: settingsSaved.lbNotification ?? defaultObj.lbNotification,
			autorun: settingsSaved.autorun ?? defaultObj.autorun,
			darkMode: settingsSaved.darkMode ?? defaultObj.darkMode,
            saveSession: settingsSaved.saveSession ?? defaultObj.saveSession
		}

        return settings;
    }

    set settings(userSettings) {
        this._localStorage.setItem("settings", JSON.stringify(userSettings));
    }
}