const settingStorage = new UserSettingsStorage();
const timerController = browser.extension.getBackgroundPage();

const minutesInputs  = Array.from( document.getElementsByClassName( "minutes" ) );
const secondsInputs  = Array.from( document.getElementsByClassName( "seconds" ) );
const pomodorosInput = document.getElementById( "numberPomodoros" );

const studyClockLine 	  = document.getElementById( "study" );
const shortBreakClockLine = document.getElementById( "shortBreak" );
const longBreakClockLine  = document.getElementById( "longBreak" );

const saveButton  = document.getElementById( "saveButton" );
const resetButton = document.getElementById( "resetButton" );

init();

function init() {

	updateInputsWithSettingsContent();

	addValidationListeners();

}

function addValidationListeners() {

	document.addEventListener( "keypress", ( keyEvent ) => {

		const keyPressed = new Key( keyEvent.key );
	
		const isValid = !keyPressed.isNumber() && !keyPressed.isSpecial() && !keyPressed.isDirectional();

		isValid && keyEvent.preventDefault();
	
	} );

	[...minutesInputs, ...secondsInputs].map( input => {

		input.addEventListener( "focusout", function() {

			const minutesInput = this.parentElement.getElementsByClassName( "minutes" )[0];
			const secondsInput = this.parentElement.getElementsByClassName( "seconds" )[0];

			InterfaceService.preventBothClocksBeingZero( minutesInput, secondsInput );

		} );

	} );

	minutesInputs.map( input => {
		
		input.addEventListener( "focusout", () => input.value = new MinutesInput( input.value ).format() );
	
	} );
	
	secondsInputs.map( input => {
		
		input.addEventListener( "focusout", () => input.value = new SecondsInput( input.value ).format() );
	
	} );
	
	pomodorosInput.addEventListener( "focusout", () => pomodorosInput.value = new PomodorosInput( pomodorosInput.value ).format() );

	saveButton.addEventListener( "click", () => {

		const study 	 = TimerFormat.minutesAndSecondsToText( studyClockLine.getElementsByClassName( "minutes" )[0].value, studyClockLine.getElementsByClassName( "seconds" )[0].value );
		const shortBreak = TimerFormat.minutesAndSecondsToText( shortBreakClockLine.getElementsByClassName( "minutes" )[0].value, shortBreakClockLine.getElementsByClassName( "seconds" )[0].value );
		const longBreak  = TimerFormat.minutesAndSecondsToText( longBreakClockLine.getElementsByClassName( "minutes" )[0].value, longBreakClockLine.getElementsByClassName( "seconds" )[0].value );

		const pomodoros  = pomodorosInput.value;

		settingStorage.userSettings = new UserSettings( pomodoros, study, shortBreak, longBreak );

		updateInputsWithSettingsContent();

		timerController.updateSettings();

	} );

	resetButton.addEventListener( "click", () => {

		settingStorage.userSettings = new UserSettings( 4, "25:00", "05:00", "30:00" );;

		updateInputsWithSettingsContent();

		timerController.updateSettings();

	} );

}

function updateInputsWithSettingsContent(){

	InterfaceService.updateClockLine( studyClockLine, settingStorage.userSettings.studytime );
	InterfaceService.updateClockLine( shortBreakClockLine, settingStorage.userSettings.shortbreak );
	InterfaceService.updateClockLine( longBreakClockLine, settingStorage.userSettings.longbreak );
	InterfaceService.updatePomodorosValue( settingStorage.userSettings.pomodoros );

}