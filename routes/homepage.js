var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var User = require('../models/user');

/* GET */
router.get('/homepage', function(req, res, next) {

	// Check if session exists
	if (req.session && req.session.user) {
	    
	    // lookup the user in the DB by pulling their email from the session
	    User.findOne({ email: req.session.user.email }, function (err, user) {

			// if the user isn't found in the DB, reset the session info and
	        // redirect the user to the login page
			if (!user) {

				console.log("USER NOT FOUND IN DB...");
	        	req.session.reset();
	        	res.redirect('/');
	    	} else {
	        
	        	// expose the user to the template
	        	res.locals.user = user;

	        	// render the homepage
	        	res.render('homepage');
	    	}
	    });
		
	} else {
	    res.redirect('/');
	}
});

module.exports = router;
