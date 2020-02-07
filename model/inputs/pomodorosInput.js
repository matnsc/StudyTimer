class PomodorosInput extends Input {

    constructor(value) {

        super(value);

    }

    format() {

        if (this._value == "" || this._value == 0) {

            this._value = 1;

        }

        return this._value;

    }

}