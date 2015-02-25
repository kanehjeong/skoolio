var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var mongoose = require('mongoose');
var User = require('../models/user');
var Project = require('../models/project');

var db = mongoose.connection;

/* GET */
router.get('/interested/:id', function(req, res, next) {

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
	        	var projectID = req.params.id;

	    		Project.findOne({ '_id' : projectID }).exec(function(err, project) {

					res.render('interested', project);
	    		});
	    	}
	    });
		
	} else {
	    res.redirect('/');
	}
});

/* POST */
router.post('/interested/:id', function(req, res, next) {

	console.log("FORM: " + req.body);

	res.render('notification_sent');
});

module.exports = router;
