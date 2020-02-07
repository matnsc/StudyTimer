class SecondsInput extends Input {

    constructor(value) {

        super(value);

    }

    format() {

        if (this._value > 59) {

            this._value = "59";

        }

        this._value = this._value.padStart(2, "0");

        return this._value;

    }

}