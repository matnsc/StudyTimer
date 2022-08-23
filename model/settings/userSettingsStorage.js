class UserSettingsStorage {

    constructor() {

        this._localStorage = window.localStorage;

    }

    get settings() {

        const pomodoros = this._getItem("pomodoros");
        const studytime = this._getItem("studytime");
        const shortbreak = this._getItem("shortbreak");
        const longbreak = this._getItem("longbreak");
        const notificationsEnabled = this._getItem("notificationAreaOpt")
        const volume = this._getItem("volume")

        return pomodoros ? new UserSettings(pomodoros, studytime, shortbreak, longbreak, notificationsEnabled, volume) : this.settings = new UserSettings(4, "25:00", "05:00", "30:00", true, 50);
    }

    set settings(userSettings) {

        this._setItem("pomodoros", userSettings.pomodoros);
        this._setItem("studytime", userSettings.studytime);
        this._setItem("shortbreak", userSettings.shortbreak);
        this._setItem("longbreak", userSettings.longbreak);
        this._setItem("notificationAreaOpt", userSettings.notificationsEnabled);
        this._setItem("volume", userSettings.volume);

        return this.settings;

    }

    _getItem(name) {

        return this._localStorage.getItem(name);

    }

    _setItem(name, value) {

        this._localStorage.setItem(name, value);

    }

}