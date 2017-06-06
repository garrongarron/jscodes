(function(window, document){

	var db;
	var createDatabase = function(){
		// 2 Mb
		db = openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
		console.log('createDatabase');

	}
	

	var createTable = function(){
		db.transaction(function (tx) {
			/* 
			As you can see, AUTOINCREMENT build a sqlite_sequence, 
			I mean a new object into database
			*/
			var create = `CREATE TABLE successes ( 
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				date unique, 
				what, 
				how 
			)`;
			tx.executeSql(create);
			console.log('createTable');
		});
	}

	var insert = function(){
		var insert = `INSERT INTO successes(date, what, how) VALUES(?, ?, ?)`;
		var date = Math.floor(Date.now() / 1000);
		var values = [date, 'win', 'luckily'];
		db.transaction(function (tx) {
			tx.executeSql(insert, values);
		});
		/*
		var query = `INSERT INTO successes(date, what, how) 
			VALUES (1, ${date}, 'win', 'luckily')`;
		console.log(query);
		tx.executeSql(query);
		*/
		console.log('insert');
	}

	var select = function(){
		db.transaction(function (tx) {
			var add = ` ORDER BY date DESC LIMIT 1 `;
			tx.executeSql('SELECT * FROM successes'+add, [], function (tx, results) {
				var len = results.rows.length, i;
				for (i = 0; i < len; i++){
				     console.log(results.rows.item(i) );
				  }
			}, null);
		});
		console.log('select');
	}

	var count = function(){
		db.transaction(function (tx) {
			tx.executeSql('SELECT COUNT(*) as c FROM successes', [], function (tx, results) {
				console.log(results.rows.item(0).c);
			}, null);
		});
		console.log('count');
	}

	var deleting = function(){
		db.transaction(function (tx) {
			tx.executeSql('DELETE FROM successes  WHERE id=1');
		});
		/*
		db.transaction(function(tx) {
			tx.executeSql('DELETE FROM successes WHERE id=?', [id]);
		});
		*/
		console.log('deleting');
	}

	var dropTable = function(){
		db.transaction(function(tx) {
			tx.executeSql("DROP TABLE successes",[], 
			    function(tx,results){console.log("Successfully Dropped")},
			    function(tx,error){console.log("Could not delete")}
			);
		});
		console.log('dropTable');
	}

	var dropDatabase = function(){
		delete db;
		db = null;
		console.log('dropDatabase');
	}

	if(typeof window.websql == "undefined"){
		window.websql = {
			"createDatabase":createDatabase,
			"createTable":createTable,
			"insert":insert,
			"select":select,
			"count":count,
			"deleting":deleting,
			"dropTable":dropTable,
			"dropDatabase":dropDatabase
		}
	}else{
		console.log("The library 'window.websql' have been already loaded before")
	}
	
})(window, document);


(function(window, document){
	window.websql.createDatabase();
	window.websql.createTable();
	window.websql.insert();
	window.websql.select();
	window.websql.count();
	window.websql.deleting();
	window.websql.dropTable();
	window.websql.dropDatabase();
	/* As you can see the results are asynchronous */
	/* 
	To work synchronously you have to use callback functions 
	similar to callback ajax functions
	*/
})(window, document);