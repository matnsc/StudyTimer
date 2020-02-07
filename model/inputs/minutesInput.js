class MinutesInput extends Input {

    constructor(value) {

        super(value);

    }

    format() {

        if (this._length > 2 && this._value[0] == "0") {

            this._value = this._value.substring(1);

        }

        this._value = this._value.padStart(2, "0");

        return this._value;

    }

}