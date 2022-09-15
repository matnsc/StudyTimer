class UserSettingsStorage {
    constructor() {
        this._localStorage = window.localStorage;
    }

    default() {
        const studyNotification = "Your break is over. Back to work!";
        const sbNotification = "It's time to take a break.";
        const lbNotification = "You completed the pomodoro cycle! Enjoy your longer break.";

        return new UserSettings(4, "25:00", "05:00", "30:00", true, 50, studyNotification, sbNotification, lbNotification);
    }

    get settings() {
        const defaultObj = this.default();

        const pomodoros             = this._getItem("pomodoros")            ?? defaultObj.pomodoros;
        const studytime             = this._getItem("studytime")            ?? defaultObj.studytime;
        const shortbreak            = this._getItem("shortbreak")           ?? defaultObj.shortbreak;
        const longbreak             = this._getItem("longbreak")            ?? defaultObj.longbreak;
        const notificationsEnabled  = this._getItem("notificationAreaOpt")  ?? defaultObj.notificationsEnabled;
        const volume                = this._getItem("volume")               ?? defaultObj.volume;
        const studyNotification     = this._getItem("studyNotification")    ?? defaultObj.studyNotification;
        const sbNotification        = this._getItem("sbNotification")       ?? defaultObj.sbNotification;
        const lbNotification        = this._getItem("lbNotification")       ?? defaultObj.lbNotification;

        return new UserSettings(pomodoros, studytime, shortbreak, longbreak, notificationsEnabled, volume, studyNotification, sbNotification, lbNotification);
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

        return this.settings;
    }

    _getItem(name) {
        return this._localStorage.getItem(name);
    }

    _setItem(name, value) {
        this._localStorage.setItem(name, value);
    }
}