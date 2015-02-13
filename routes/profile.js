var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var mongoose = require('mongoose');
var User = require('../models/user');
var Profile = require('../models/profile');

var db = mongoose.connection;

/* GET */
router.get('/profile', function(req, res, next) {

	// Check if session exists
	if (req.session && req.session.user) {
	    
	    // lookup the user in the DB by pulling their email from the session
	    User.findOne({ email: req.session.user.email }, function (err, user) {

	    	if(err) {
	    		res.send(err);
	    		return;
	    	}

			// if the user isn't found in the DB, reset the session info and
	        // redirect the user to the login page
			if (!user) {

	        	req.session.reset();
	        	res.redirect('/');
	    	} else {
	        
	        	// expose the user to the template
	        	res.locals.user = user;

	        	console.log("ID IS: " + req.session.user.id);
				Profile.find({ "_id": req.session.user.id }, function(err, profile) {
					if(err) {
						res.send(err);
						return;
					}

				    res.render('profile', profile);  
				});
	    	}
	    });
		
	} else {
	    res.redirect('/');
	}
});

module.exports = router;
