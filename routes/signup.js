var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var mongoose = require('mongoose');

var app = express();
var router = express.Router();

// get current db connection
var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }));

/* GET */
router.get('/signup', function(req, res, next) {
	res.render('signup');
});

/* POST */
router.post('/signup', function(req, res, next) {
	console.log("Starting POST req and adding: " + req.body.fname);

	var newUser = new User(req.body);

	newUser.save(function(err) {
		if(err) {
			return res.send(err);
		}
		else {
			res.redirect('/account_created')
		}
	});
});

module.exports = router;
