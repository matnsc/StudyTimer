class Key {

    constructor(value) {

        this._value = value;

    }

    isNumber() {

        return this._value >= 0 && this._value <= 9;

    }

    isSpecial() {

        return this._value == "Backspace" || this._value == "Tab";

    }

    isDirectional() {

        return this._value.includes("Arrow");

    }

}