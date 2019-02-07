const minutesInputs  = Array.from( document.getElementsByClassName( "minutes" ) );
const secondsInputs  = Array.from( document.getElementsByClassName( "seconds" ) );
const pomodorosInput = document.getElementById( "numberPomodoros" );

document.addEventListener( "keypress", function( keyEvent ){

	const keyPressed = new Key( keyEvent.key );

	if( !keyPressed.isNumber() && !keyPressed.isSpecial() && !keyPressed.isDirectional() ) {
	
		keyEvent.preventDefault();
		
	}

} );

minutesInputs.forEach( input => {
	
	input.addEventListener( "focusout", () => input.value = new MinutesInput( input.value ).format() );

});

secondsInputs.forEach( input => {
	
	input.addEventListener( "focusout", () => input.value = new SecondsInput( input.value ).format() );

});

pomodorosInput.addEventListener( "focusout", () => pomodorosInput.value = new PomodorosInput( pomodorosInput.value ).format() );