var mysql = require('mysql');

var connection = createConnection({
	host: 'localhost'
	user: 'khchong'
	password: 'helloWorld'
	database: 'anonnomore'
	port: 3306

});

connection.connect();

var query = connection.query(
	'SELECT * from Users u', function(err, result, fields) {
		if (err) throw err;
		console.log('result: ', result)
	});

connection.end();