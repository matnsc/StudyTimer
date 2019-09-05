const settingStorage = new UserSettingsStorage();
const backgroundPage = browser.extension.getBackgroundPage();

const minutesInputs  = Array.from( document.getElementsByClassName( "minutes" ) );
const secondsInputs  = Array.from( document.getElementsByClassName( "seconds" ) );
const pomodorosInput = document.getElementById( "numberPomodoros" );
const buttons        = Array.from( document.getElementsByClassName( "button" ) );

const studyClockLine 	  = Array.from( document.getElementById( "study" ) );
const shortBreakClockLine = Array.from( document.getElementById( "shortBreak" ) );
const longBreakClockLine  = Array.from( document.getElementById( "longBreak" ) );

let settings = settingStorage.userSettings;

init();

function init() {

	InterfaceService.updateClockLine( studyClockLine, settings.studytime );
	InterfaceService.updateClockLine( shortBreakClockLine, settings.shortbreak );
	InterfaceService.updateClockLine( longBreakClockLine, settings.longbreak );
	InterfaceService.updatePomodorosValue( settings.pomodoros );

	addValidationListeners();

}

function addValidationListeners() {

	document.addEventListener( "keypress", ( keyEvent ) => {

		const keyPressed = new Key( keyEvent.key );
	
		const isValid = !keyPressed.isNumber() && !keyPressed.isSpecial() && !keyPressed.isDirectional();

		isValid && keyEvent.preventDefault();
	
	} );

	[...minutes, ...seconds].map( input => {

		input.addEventListener( "focusout", () => {

			const minutesInput = this.parentElement.getElementsByClassName( "minutes" );
			const secondsInput = this.parentElement.getElementsByClassName( "seconds" );

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

	buttons.map( button => {
	//fixing that part later (there's no more "clockLine")
		if( button.value == "Save" ) {

			button.addEventListener( "click", function() {

				let values    = new Array();
				let pomodoros = pomodorosInput.value;

				for( let i = 0; i < clockLine.length; i++ ) {
					
					const minutes = clockLine[i].getElementsByClassName( "minutes" )[0].value;
					const seconds = clockLine[i].getElementsByClassName( "seconds" )[0].value;

					values.push( TimerFormat.minutesAndSecondsToText( minutes, seconds ) );
		
				}

				InterfaceService.updateClockLines( clockLine, values );
				InterfaceService.updatePomodorosValue( pomodoros );

				settings = new UserSettings( pomodoros, values[0], values[1], values[2] );
				settingStorage.userSettings = settings;

				backgroundPage.updateSettings();

			} );

		} else if( button.value == "Reset" ) {

			button.addEventListener( "click", function() {
				
				let values = { 0: "25:00", 1: "05:00", 2: "30:00" };
				let pomodoros = 4;

				InterfaceService.updateClockLines( clockLine, values );
				InterfaceService.updatePomodorosValue( pomodoros );

				settings = new UserSettings( pomodoros, values[0], values[1], values[2] );
				settingStorage.userSettings = settings;

				backgroundPage.updateSettings();

			} );

		}

	} );

}