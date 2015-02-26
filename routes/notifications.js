var express = require('express');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var User = require('../models/user');
var Notification = require('../models/notification');

var app = express();
var router = express.Router();

/* GET */
router.get('/notifications', function(req, res, next) {
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

	        	Notification.find({ 'toID': req.session.user._id }).sort({'createdAt' : 'desc'}).exec(function(err, notifications) {
					
					if(err) {
						res.send(err);
						return;
					}

					var nMap = {};
					nMap["notifications"] = [];

					notifications.forEach(function(element, index, array) {

						var elementString = {
							"_id": element._id,
							"fromID": element.fromID,
							"toID": element.toID,
							"from": element.from,
							"to": element.to,
							"createdAt": element.createdAt.toString().substring(4,24),
							"project": element.project,
							"roles": element.roles.join(', '),
							"message": element.message
						};
						nMap["notifications"].push(elementString);
					});

					res.render('notifications', nMap);
				});
			}	
	    });
		
	} else {
	    res.redirect('/');
	}
});

module.exports = router;