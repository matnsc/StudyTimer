class Timer {
	
	constructor( time ){
		
		this._time = time;
		this._init = new Date().getTime();
		this._endtime = this._init + this._time;
		
	}
	
	update(){
		
		var now = new Date().getTime();
		
		if( now <= this._endtime ){
			
			return this._endtime - now;
			
		} else {
			
			return 0;
			
		}
		
	}
	
}