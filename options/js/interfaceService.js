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
        document.getElementById("notificationAreaOpt").checked = value;
    }

    static updateVolume(value) {
        document.getElementById("volume").value = value;
        document.getElementById("volumeSpan").innerText = value + "%";
    }

    static updateNotificationMessage(element, value) {
        element.value = value;
    }

    static preventBothClocksBeingZero(minutesInput, secondsInput) {
        if ((minutesInput.value == "00" || minutesInput.value == "") && (secondsInput.value == "00" || secondsInput.value == "")) {
            secondsInput.value = "01";
        }
    }

    static updateAutorunOption(value) {
        document.getElementById("autorunOpt").checked = value;
    }

    static updateDarkModeOption(value) {
        document.getElementById("darkOpt").checked = value;
    }

    static setSelectedTheme(darkMode) {
        let fontColor, contentColor, backgroundColor, buttonColor, hoverColor;

        if (darkMode) { 
            // Dark mode
            fontColor       = "#a8aab1";
            contentColor    = "#242526";
            backgroundColor = "#18191a";
            buttonColor     = "#2D2D2D";
            hoverColor      = "#3a3b3c";
        } else { 
            // Light mode
            fontColor       = "#737373";
            contentColor    = "#ffffff";
            backgroundColor = "#f3f3f3";
            buttonColor     = "#f3f3f3";
            hoverColor      = "#e4e4e4";
        }

        document.documentElement.style.setProperty('--font-color', fontColor);
        document.documentElement.style.setProperty('--content-color', contentColor);
        document.documentElement.style.setProperty('--background-color', backgroundColor);
        document.documentElement.style.setProperty('--button-color', buttonColor);
        document.documentElement.style.setProperty('--hover-color', hoverColor);
    }

    static updateSaveSessionOption(value) {
        document.getElementById("saveSessionOpt").checked = value;
    }
}