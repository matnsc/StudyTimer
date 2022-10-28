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

	_changeElementText(id, value) {
		document.getElementById(id).textContent = value;
	}
}