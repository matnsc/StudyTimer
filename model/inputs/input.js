class Input {

    constructor(value) {

        this._value = value;
        this._length = value.length;

    }

    get value() {

        return this._value;

    }

    set value(value) {

        this._value = value;

    }

    get length() {

        return this._length;

    }

    format() {};

}