class UserSettingsStorage {

    constructor() {

        this._localStorage = window.localStorage;

    }

    get settings() {

        const pomodoros = this._getItem("pomodoros");
        const studytime = this._getItem("studytime");
        const shortbreak = this._getItem("shortbreak");
        const longbreak = this._getItem("longbreak");
        const soundEnabled = this._getItem("soundEnabled");

        return pomodoros ? new UserSettings(pomodoros, studytime, shortbreak, longbreak, soundEnabled) : this.settings = new UserSettings(4, "25:00", "05:00", "30:00", true);

    }

    set settings(userSettings) {

        this._setItem("pomodoros", userSettings.pomodoros);
        this._setItem("studytime", userSettings.studytime);
        this._setItem("shortbreak", userSettings.shortbreak);
        this._setItem("longbreak", userSettings.longbreak);
        this._setItem("soundEnabled", userSettings.soundEnabled);

        return this.settings;

    }

    _getItem(name) {

        return this._localStorage.getItem(name);

    }

    _setItem(name, value) {

        this._localStorage.setItem(name, value);

    }

}