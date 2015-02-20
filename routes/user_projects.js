var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var User = require('../models/user');
var Project = require('../models/project');

/* GET */
router.get('/user_projects', function(req, res, next) {

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

	    		Project.find({ 'createdByID': req.session.user._id })
	    			.sort({'createdAt' : 'desc'})
	    			.exec(function(err, projects) {
					
						if(err) {
							res.send(err);
							return;
						}

						var pMap = {};
						pMap["projects"] = projects;

						res.render('user_projects', pMap);
	    			});
	    	}
	    });
		
	} else {
	    res.redirect('/');
	}
});

module.exports = router;
