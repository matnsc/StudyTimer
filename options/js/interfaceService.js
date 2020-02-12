class InterfaceService {

    static updateClockLine(clockLine, value) {

        const clockValue = TimerFormat.textToMinutesAndSeconds(value);

        clockLine.getElementsByClassName("minutes")[0].value = clockValue["minutes"];
        clockLine.getElementsByClassName("seconds")[0].value = clockValue["seconds"];

    }

    static updatePomodorosValue(value) {

        document.getElementById("numberPomodoros").value = value;

    }

    static updateNotificationSoundOption(value) {

        document.getElementById("sound").checked = value == "true";

    }

    static preventBothClocksBeingZero(minutesInput, secondsInput) {

        if ((minutesInput.value == "00" || minutesInput.value == "") && (secondsInput.value == "00" || secondsInput.value == "")) {

            secondsInput.value = "01";

        }

    }

}