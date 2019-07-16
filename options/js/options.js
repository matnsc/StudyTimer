const settingStorage = new UserSettingsStorage();
let	  settings 		 = settingStorage.userSettings;
const backgroundPage = browser.extension.getBackgroundPage();

const allInputs 	 = Array.from( document.querySelectorAll( "input[type=text]" ) );
const clockLine 	 = Array.from( document.getElementsByClassName( "clockLine" ) );
const minutesInputs  = Array.from( document.getElementsByClassName( "minutes" ) );
const secondsInputs  = Array.from( document.getElementsByClassName( "seconds" ) );
const pomodorosInput = document.getElementById( "numberPomodoros" );
const buttons 		 = Array.from( document.getElementsByClassName( "button" ) );

init();

function init() {

	InterfaceService.updateClockLines( clockLine, { "0": settings.studytime, "1": settings.shortbreak, "2": settings.longbreak } );
	InterfaceService.updatePomodorosValue( settings.pomodoros );

	addValidationListeners();

}

function addValidationListeners() {

	document.addEventListener( "keypress", function( keyEvent ) {

		const keyPressed = new Key( keyEvent.key );
	
		if( !keyPressed.isNumber() && !keyPressed.isSpecial() && !keyPressed.isDirectional() ) {
		
			keyEvent.preventDefault();
			
		}
	
	} );
	
	allInputs.filter( element => element.id != "numberPomodoros" ).forEach( input => {
	
		input.addEventListener( "focusout", function() {
	
			InterfaceService.preventBothClocksBeingZero( this.parentElement );
	
		} );
	
	} );
	
	minutesInputs.forEach( input => {
		
		input.addEventListener( "focusout", () => input.value = new MinutesInput( input.value ).format() );
	
	} );
	
	secondsInputs.forEach( input => {
		
		input.addEventListener( "focusout", () => input.value = new SecondsInput( input.value ).format() );
	
	} );
	
	pomodorosInput.addEventListener( "focusout", () => pomodorosInput.value = new PomodorosInput( pomodorosInput.value ).format() );

	buttons.forEach( button => {

		if( button.value == "Save" ) {

			button.addEventListener( "click", function() {

				let values    = new Array();
				let pomodoros = pomodorosInput.value;

				for( let i = 0; i < clockLine.length; i++ ) {
					
					const minutes = clockLine[i].getElementsByClassName( "minutes" )[0].value;
					const seconds = clockLine[i].getElementsByClassName( "seconds" )[0].value;

					values.push( ClockFormat.formatValuesToString( minutes, seconds ) );
		
				}

				InterfaceService.updateClockLines( clockLine, values );
				InterfaceService.updatePomodorosValue( pomodoros );

				settings = new UserSettings( pomodoros, values[0], values[1], values[2] );
				settingStorage.userSettings = settings;

				backgroundPage.updateSettings();

			} );

		} else if( button.value == "Reset" ) {

			button.addEventListener( "click", function() {
				
				let values = { 0: "25:00", 1: "15:00", 2: "45:00" };
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