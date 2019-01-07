class InterfaceService {
	
	updateTimerValues( completedPomodoros, timerState, actualTime ) {
		
		this._changeElementValue( "pomodoroNumber", completedPomodoros );
	
		this._changeElementValue( "caption", timerState );
		
		this._changeElementValue( "clock", actualTime );
		
	}
	
	updateButtonState( running ) {
		
		if( running ) {
			
			document.getElementById( "play" ).setAttribute( "disabled", "disabled" );
			document.getElementById( "pause" ).removeAttribute( "disabled" );
			
		} else {
			
			document.getElementById( "pause" ).setAttribute( "disabled", "disabled" );
			document.getElementById( "play" ).removeAttribute( "disabled" );
			
		}
		
	}
	
	_changeElementValue( id, value ) {
		
		document.getElementById( id ).innerHTML = value;
		
	}
	
}