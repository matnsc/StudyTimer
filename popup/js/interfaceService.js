class InterfaceService {

	updateTimerValues(completedPomodoros, timerState, actualTime) {

		this._changeElementText("pomodoroNumber", completedPomodoros);
		this._changeElementText("caption", timerState);
		this._changeElementText("clock", actualTime);

	}

	updateButtonState(running) {

		if (running) {

			document.getElementById("play").setAttribute("disabled", "disabled");
			document.getElementById("pause").removeAttribute("disabled");

		} else {

			document.getElementById("pause").setAttribute("disabled", "disabled");
			document.getElementById("play").removeAttribute("disabled");

		}

	}

	_changeElementText(id, value) {

		document.getElementById(id).textContent = value;

	}

}