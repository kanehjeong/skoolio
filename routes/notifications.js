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
					nMap["user"] = [];

					var userString = {
						"email": req.session.user.email,
						"name": req.session.user.fname + " " + req.session.user.lname
					};
					nMap["user"].push(userString);

					notifications.forEach(function(element, index, array) {

						User.findById(element.fromID, function(err, fromUser) {

							var imageExists = false;
							var imageData = "";
							var imageContentType = "";
							if(!(fromUser.image.data === undefined)) {
								imageExists = true;
								imageData = fromUser.image.data.toString('base64');
								imageContentType = fromUser.image.contentType;
							}

							var elementString = {
								"_id": element._id,
								"fromID": element.fromID,
								"toID": element.toID,
								"from": element.from,
								"to": element.to,
								"createdAt": element.createdAt.toString().substring(4,15),
								"project": element.project,
								"projectID": element.projectID,
								"image-exists": imageExists,
								"image-data": imageData,
								"image-contentType": imageContentType,
								"roles": element.roles.join(', '),
								"message": element.message,
								"fromBio": fromUser.bio,
								"fromSkills": fromUser.skills
							};
							nMap["notifications"].push(elementString);

							if(index === array.length-1) {

								res.render('notifications', nMap);
							}
						});
					});
					
					console.log(notifications);
					// Should only get here if no notifications
					if(notifications.length === 0) {

						var homepageLink = "<a href='/homepage'>homepage</a>";

						var noNotificationObj = {
							"empty": true,								
						};

						res.render('notifications', noNotificationObj);
					}
				});
			}	
	    });
		
	} else {
	    res.redirect('/');
	}
});

router.post('/notifications/:id/delete', function(req, res, next) {
	var notificationID = req.params.id;

	Notification.findOne({ "_id": notificationID }).remove().exec( function(err) {
		if(err) {
			console.log(err);
		}

		res.redirect('../../notifications');
	});
});



module.exports = router;