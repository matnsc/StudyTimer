class UserSettingsStorage {
    
    constructor() {

        this._localStorage = window.localStorage;

    }

    get userSettings() {

        const pomodoros  = this._getItem( "pomodoros" );
        const studytime  = this._getItem( "studytime" );
        const shortbreak = this._getItem( "shortbreak" );
        const longbreak  = this._getItem( "longbreak" );

        return pomodoros ? new UserSettings( pomodoros, studytime, shortbreak, longbreak ) : null;

    }

    set userSettings( userSettings ) {

        this._setItem( "pomodoros",  userSettings.pomodoros );
        this._setItem( "studytime",  userSettings.studytime );
        this._setItem( "shortbreak", userSettings.shortbreak );
        this._setItem( "longbreak",  userSettings.longbreak );

        return this.userSettings;

    }

    _getItem( name ) {

        return this._localStorage.getItem( name );

    }

    _setItem( name, value ) {

        this._localStorage.setItem( name, value );

    }

}