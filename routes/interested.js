var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var mongoose = require('mongoose');
var User = require('../models/user');
var Project = require('../models/project');
var Notification = require('../models/notification');

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

	    			var projectStr = {
	    				"createdBy": project.createdBy,
						"createdByID": project.createdByID,
						"createdAt": project.createdAt,
					    "title": project.title,
					    "type": project.type,
					    "roles": project.roles,
					    "description": project.description,
					    "user": [{
					    			"email": req.session.user.email,
					    			"name": req.session.user.fname + " " + req.session.user.lname
					    		}]
	    			};

					res.render('interested', projectStr);
	    		});
	    	}
	    });
		
	} else {
	    res.redirect('/');
	}
});

/* POST */
router.post('/interested/:id', function(req, res, next) {
	
	// Check if session exists
	if (req.session && req.session.user) {

		var projectID = req.params.id;
		Project.findOne({ '_id' : projectID }).exec(function(err, project) {
			//var moreThanOneRole = typeof req.body.type === "string" ? false : true;
			
			var newNotification = new Notification({
				fromID: req.session.user._id,
				toID: project.createdByID,
				from: req.session.user.fname + " " + req.session.user.lname,
				to: project.createdBy,
				project: project.title,
				projectID: projectID,
				roles: req.body.roles,
				message: req.body.message 
			});

			newNotification.save(function(err) {

				if(err) {
					return res.send(err);
				}
				else {
					res.render("notification_sent");
				}
			});

		});
	}

});

module.exports = router;
