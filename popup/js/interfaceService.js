class InterfaceService {

	_textToMinutesAndSeconds(value) {
        const minutesAndSeconds = value.split(':');

        return {
            "minutes": minutesAndSeconds[0],
            "seconds": minutesAndSeconds[1]
        };
    }

	_textToMilliseconds(value) {
        const minutesAndSeconds = this._textToMinutesAndSeconds(value);

        const minutes = parseInt(minutesAndSeconds.minutes);
        const seconds = parseInt(minutesAndSeconds.seconds);

        return ((minutes * 60) * 1000) + (seconds * 1000);
    }

	_millisecondsToPercentage(total, value) {
        if (total <= 0 || value <= 0) return 100;

        return 100 - ((value / total) * 100);
    }

	updateTimerValues(completedPomodoros, timerState, actualTime) {

		this._changeElementText("pomodoroNumber", completedPomodoros);
		this._changeElementText("caption", timerState);
		this._changeElementText("clock", actualTime);

	}

	updateButtonState(running) {

		if (running) {

			document.getElementById("play").style.display = "none";
			document.getElementById("pause").style.display = "inline";

		} else {

			document.getElementById("play").style.display = "inline";
			document.getElementById("pause").style.display = "none";

		}

	}

	updateProgressCircle(total, time, color) {
		const progressMaxOffset = 470;
		const totalMil = this._textToMilliseconds(total);
		const timeMil = this._textToMilliseconds(time);
		const percentage = this._millisecondsToPercentage(totalMil, timeMil);

		document.documentElement.style.setProperty('--progress-color', color);
		document.documentElement.style.setProperty('--progress-opacity', (percentage >= 100 ? 0 : 1));
		document.documentElement.style.setProperty('--progress-stroke', percentage * (progressMaxOffset / 100));
	}

	setSelectedTheme(darkMode) {
		let fontColor, backgroundColor, hoverColor, primaryHoverColor;

        if (darkMode) { 
            // Dark mode
            fontColor       	= "#a8aab1";
            backgroundColor 	= "#242526";
            hoverColor      	= "#3a3b3c";
			primaryHoverColor 	= "rgba(0, 0, 0, 0.8)";
        } else { 
            // Light mode
            fontColor       	= "#737373";
            backgroundColor 	= "#ffffff";
            hoverColor      	= "#e4e4e4";
			primaryHoverColor 	= "rgba(0, 0, 0, 0.23)";
        }

        document.documentElement.style.setProperty('--font-color', fontColor);
        document.documentElement.style.setProperty('--background-color', backgroundColor);
        document.documentElement.style.setProperty('--hover-color', hoverColor);
		document.documentElement.style.setProperty('--primary-hover-color', primaryHoverColor);
	}

	_changeElementText(id, value) {
		document.getElementById(id).textContent = value;
	}
}