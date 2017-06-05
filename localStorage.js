(function(window, document){
	if (typeof(Storage) !== "undefined") {
		var getLocal = function(k){
			var v = localStorage.getItem(k)
			if(v == null){
				return {};
			} else {
				return JSON.parse(v)
			}
		}
		var setLocal = function(k, json){
			var str = JSON.stringify(json);
			localStorage.setItem(k, str);
		}
	} else {
	    // Sorry! No Web Storage support..
	}

	if(typeof window.storage == "undefined"){
		window.storage = {
			"getLocal":getLocal,
			"setLocal":setLocal
		}

	}else{
		console.log("The library 'window.storage' have been already loaded before")
	}
})(window, document);


//Please uncomment the following lines

//storage.setLocal('federico',{age:32,nationality:'argentine',occupation:'PHP Developer'});
//console.log(storage.getLocal('federico'));