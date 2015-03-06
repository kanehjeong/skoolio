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


	var newUser = new User(req.body);
	newUser.newUser = true;
	newUser.bio = "No Summary Created";

	newUser.save(function(err) {
		if(err) {
			return res.send(err);
		}

		else {
			// attempt to authenticate user
		    User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason) {
		        if (err) {
		            throw err;
		        }

		        // login was successful if we have a user
		        if (user) {

		            // handle login success
		            req.user = user;
		            req.session.user = user;

		            // delete the password from the session for security
		            delete req.user.password; 

		            res.redirect('/homepage');
		            return;
		        }
		    });
		}
	});
});

module.exports = router;
