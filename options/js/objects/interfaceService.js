class InterfaceService {

    static updateClockLines( clockLines, values ) {

        for( let i = 0; i < clockLines.length; i++ ) {

            let clockValues = ClockFormat.formatStringToValues( values[i] );

            clockLines[i].getElementsByClassName( "minutes" )[0].value = clockValues["minutes"];
            clockLines[i].getElementsByClassName( "seconds" )[0].value = clockValues["seconds"];

        }

    }

    static updatePomodorosValue( value ) {

        document.getElementById( "numberPomodoros" ).value = value;

    }

    static preventBothClocksBeingZero( clockLine ) {

        const minutesInput = clockLine.getElementsByClassName( "minutes" )[0];

        const secondsInput = clockLine.getElementsByClassName( "seconds" )[0];

        if( ( minutesInput.value == "00" || minutesInput.value == "" ) && ( secondsInput.value == "00" || secondsInput.value == "" ) ) {

            secondsInput.value = "01";

        }

    }

}