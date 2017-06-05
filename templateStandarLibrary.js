(function(window, document){

	var private_attribute = "This is the value of the 'private_attribute' variable";

	var private_method = function(){
		console.log("private_method have been called");
		console.log(private_attribute);
	}

	var public_method = function(){
		console.log("public_method have been called");
		private_method();
	}

	if(typeof window.library == "undefined"){
		window.library = {
			"public":public_method
		}
		//callback area start 
		//@todo
		window.library.public();
		//callback area finish
	}else{
		console.log("The library 'window.library' have been already loaded before")
	}
	
})(window, document);