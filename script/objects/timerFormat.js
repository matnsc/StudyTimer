class TimerFormat{
		
	static formatTextToMil( value ) {
		
		let valueSplit = value.split( ":" );
		
		let minutes = parseInt( valueSplit[0] );
		let seconds = parseInt( valueSplit[1] );
		
		return ( ( minutes * 60 ) * 1000 ) + ( seconds * 1000 );
		
	}
	
	static formatMilToText( value ) {
		
		let qtSeconds = value / 1000;
		
		let minutes = qtSeconds / 60 ;
		let seconds = qtSeconds % 60 ;
		
		minutes = Math.floor( minutes );
		seconds = Math.floor( seconds );
		
		if( minutes < 10 ) {
			
			minutes = "0" + minutes;
			
		}
		
		if( seconds < 10 ) {
			
			seconds = "0" + seconds;
			
		}
		
		return minutes + ":" + seconds;
		
	}
	
	static formatMilToMinuteText( value ) {
		
		let minutes = value / 1000 / 60;
		
		return Math.ceil( minutes );
		
	}
	
}