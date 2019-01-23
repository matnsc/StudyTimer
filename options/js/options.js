let inputs = document.querySelectorAll( "input[type=text]" );

for( let i = 0; i < inputs.length; i++ ) {
	
	inputs[i].addEventListener( "keypress", keyPressedValidation );
	inputs[i].addEventListener( "focusout", focusOutValidation );
	
}

function isNumber( e ) {
	
	return e.key >= 0 && e.key <= 9;

}

function isSpecialKey( e ) {
	
	return e.key == "Backspace" || e.key == "Tab";
	
}

function isDirectionalKey( e ) {
	
	return e.key.includes( "Arrow" );
	
}

function keyPressedValidation( e ) {
	
	if( !isNumber( e ) && !isSpecialKey( e ) && !isDirectionalKey( e ) ) {
		
		e.preventDefault();
		
	}
	
}

function focusOutValidation() {
	
	if( this.className == "seconds" ) {
		
		if( this.value > 59 ) {
		
			this.value = 59;
			
		}
		
	}
	
	if( this.className == "minutes" ) {
		
		if( this.value.length > 2 && this.value[0] == "0" ) {
			
			this.value = this.value.substring(1);
			
		}
		
	}

	this.value = this.value.padStart( 2, '0' );
	
}