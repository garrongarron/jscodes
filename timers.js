// SetInterval
(function(window, document){

	var timer ;

	var getTheTime = function(){
		return Math.floor(Date.now() / 1000) ;
	}
	var start = function(){
		timer = setInterval(function() {
			console.log(getTheTime());
		}, 1000*1);
		console.log("'window.timer.start()' have been executed");
	}

	var stop = function(){
		    clearInterval(timer);
		    console.log("'window.timer.stop()' have been executed");
	}

	if(typeof window.timer == "undefined"){
		window.timer = {
			"start":start,
			"stop":stop,
		}
	}else{
		console.log("The library 'window.library' have been already loaded before")
	}
	
})(window, document);
// Switcher
(function(window, document){

	var timer ;

	var getTheTime = function(){
		return Math.floor(Date.now() / 1000) ;
	}
	var start = function(){
		window.timer.start();
		timer = setTimeout(function() {
			window.timer.stop();
		}, 1000*5);
		console.log("In 5 seconds 'window.timer.stop();' will be executed ")
	}

	var stop = function(){
		clearTimeout(timer);
		console.log("'window.switcher.stop()' have been executed");
	}

	if(typeof window.switcher == "undefined"){
		window.switcher = {
			"start":start,
			"stop":stop
		}
	}else{
		console.log("The library 'window.library' have been already loaded before")
	}
	
})(window, document);

// Please uncomment the following line
// switcher.start()