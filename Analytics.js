
/*
	Simple Analytics Model, Alpha Version 
	
	Tian Permana, September 9th 2011
*/


var Analytics = {

	processor : null, // this where processor defined
	status : "notDefined", // this where the status defined, which "ready", "execution" and "finish"
	browser : "notDefined", // browser information
	os : "notDefined", // operating system information
	geolocationSupport : false, // flag whether the geolocation is supported by the browser or not
	geolocation : "notDefined", // geolocation position information
	
	onReady : function( callback ){
	
		// here where the Analytics ready to execute
		// this method called before execute
		// make the status as "ready"
		
		Analytics.changeStatus("ready");
		
		// Detect operating system information
		Analytics.os = Analytics.osDetection();
		
		// Detect browser information
		Analytics.browser = Analytics.browserDetection.detect();
		
		// Get geolocation information
		Analytics.geolocationDetetion.detect();
		
		callback.call();
	
	},
	
	execute : function( options ){
		
		/*
			Here are the Analytics executed
		
			Options list :
			
			- onReadyCallback : callback when the Analytics ready, called before execute
			- onFinishCallback : callback when the Analytics finish, called after finish execution
		*/
		

		Analytics.onReady( options.onReadyCallback );
		
		Analytics.changeStatus("execute");
		
		Analytics.onFinish( options.onFinishCallback );
	
	},
	
	onFinish : function( callback ){
	
		// here where the Analytics execution finished
		// this methis will called after execute function
		// make the status as finish
		
		Analytics.changeStatus("finish");
	
		callback.call();
	},
	
	browserDetection : {
	
		// ---- THIS METHOD WILL GET BROWSER INFORMATION OF A USER ---- //
		
		// UserAgent RegExp
		userAgent : navigator.userAgent,
		rwebkit : /(webkit)[ \/]([\w.]+)/,
		rchrome : /(chrome)[ \/]([\w.]+)/,
		ropera : /(opera)(?:.*version)?[ \/]([\w.]+)/,
		rmsie : /(msie) ([\w.]+)/,
		rmozilla : /(mozilla)(?:.*? rv:([\w.]+))?/,
		
		uaMatch: function( ua ) {
			
			// ---- MATCHING THE CURRENT USER AGENT WITH THE DEFINED USER AGENT REGEXP --- //
			
			ua = ua.toLowerCase();
	
			var match = Analytics.browserDetection.rchrome.exec( ua ) || 
						Analytics.browserDetection.rwebkit.exec( ua ) ||
						Analytics.browserDetection.ropera.exec( ua ) ||
						Analytics.browserDetection.rmsie.exec( ua ) ||
						ua.indexOf("compatible") < 0 && Analytics.browserDetection.rmozilla.exec( ua ) ||
						[];

			return { browser: match[1] || "", version: match[2] || "0" };
		},
			
		detect : function(){
			
			// --- DO THE DETECTION --- //

			var browserInfo = Analytics.browserDetection.uaMatch( Analytics.browserDetection.userAgent );
			
			return browserInfo;
			
		}
	},
	
	osDetection : function(){
	
		var os = navigator.platform;
		
		return os;
	
	},
	
	geolocationDetection : {
		
		isSupported : function(){
		
			// Detect geolocation support first
			
			if( navigator.geolocation ){
			
				Analytics.geolocationSupport = true;
				
				return true;
			}
			
			return false;
		
		},
		
		detect : function(){
			
			// Check whether the geolocation is supoported or not
			if( Analytics.geolocationDetection.isSupported() ){

				// One-shot position request.
				navigator.geolocation.getCurrentPosition( function( position ){
					
					// Set the geolocation information 
					
					Analytics.geolocation = {
					
						isError : false,
						position : position.coords
					}
					
					return true;
				
				}, function( errorMessage ){
					
					// set the geolocation as error, and give the error message
					
					Analytics.geolocation = {
					
						isError : true,
						message : errorMessage
					}
					
					return false;
					
				});
			}
		},
		
	},
		
	changeStatus : function(status, callback){
	
		// change the status of Analytics processing
		
		Analytics.status = "status";
		
		return true;
	}
	


}