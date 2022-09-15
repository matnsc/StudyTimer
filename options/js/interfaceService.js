class InterfaceService {
    static updateClockLine(clockLine, value) {
        const clockValue = TimerFormat.textToMinutesAndSeconds(value);

        clockLine.getElementsByClassName("minutes")[0].value = clockValue["minutes"];
        clockLine.getElementsByClassName("seconds")[0].value = clockValue["seconds"];
    }

    static updatePomodoros(value) {
        document.getElementById("numberPomodoros").value = value;
    }

    static updateNotificationOption(value) {
        document.getElementById("notificationAreaOpt").checked = value == "true";
    }

    static updateVolume(value) {
        document.getElementById("volume").value = value;
        document.getElementById("volumeSpan").innerHTML = value + "%";
    }

    static updateNotificationMessage(element, value) {
        element.value = value;
    }

    static preventBothClocksBeingZero(minutesInput, secondsInput) {
        if ((minutesInput.value == "00" || minutesInput.value == "") && (secondsInput.value == "00" || secondsInput.value == "")) {
            secondsInput.value = "01";
        }
    }
}