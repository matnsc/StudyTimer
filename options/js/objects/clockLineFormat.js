class ClockFormat {

    static formatStringToValues( value ) {
        
        const valuesArray = value.split( ":" );

        const object = {

            "minutes": valuesArray[0],
            "seconds": valuesArray[1],

        }

        return object;

    }

}