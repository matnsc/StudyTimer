class TimerFormat{
		
	static formatTextToMil( value ) {
		
		var valueSplit = value.split( ":" );
		
		var minutes = parseInt( valueSplit[0] );
		var seconds = parseInt( valueSplit[1] );
		
		return ( ( minutes * 60 ) * 1000 ) + ( seconds * 1000 );
		
	}
	
	static formatMilToText( value ) {
		
		var qtSeconds = value / 1000;
		
		var minutes = qtSeconds / 60 ;
		var seconds = qtSeconds % 60 ;
		
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
		
		var minutes = value / 1000 / 60;
		
		return Math.ceil( minutes );
		
	}
	
}