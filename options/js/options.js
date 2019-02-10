const settingStorage = new UserSettingsStorage();
let	  settings 		 = settingStorage.userSettings;

const allInputs 	 = Array.from( document.querySelectorAll( "input[type=text]" ) );
const clockLine 	 = Array.from( document.getElementsByClassName( "clockLine" ) );
const minutesInputs  = Array.from( document.getElementsByClassName( "minutes" ) );
const secondsInputs  = Array.from( document.getElementsByClassName( "seconds" ) );
const pomodorosInput = document.getElementById( "numberPomodoros" );

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

}