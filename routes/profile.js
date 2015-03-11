var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var mongoose = require('mongoose');
var User = require('../models/user');
var fs = require('fs');

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

	        	var imageExist = false;
	        	var imageData = "";
	        	if( !(user.image.data === undefined) ) {
					imageExist = true;

					// need to decode image as base64 so html can read it
					imageData = user.image.data.toString('base64');
				}


	        	var userString = 
		        	{
		        		"user": [{
						    		"email": req.session.user.email,
						    		"name": req.session.user.fname + " " + req.session.user.lname
						    	}],

						"_id": user._id,
						"email": user.email,
						"username": user.username,
						"fname": user.fname,
						"lname": user.lname,
						"skills": user.skills,
						"bio": user.bio,
						"image-data": imageData,
						"image-contentType": user.image.contentType

					};

				res.render('profile', userString);
	    	}
	    });
		
	} else {
	    res.redirect('/');
	}
});

router.post('/profile/user:id/edit', function(req, res, next) {
	var profileUserId = req.params.id;

	User.findById(profileUserId, function(err, the_user) {
		if(err) {
			console.log(err);
		}

		the_user.skills = (req.body.skills === undefined) ? [] : req.body.skills;
		the_user.bio = (req.body.bio === undefined) ? "" : req.body.bio; 

		if(!(req.files.image === undefined)) {
			var tmp_path = req.files.image.path;
		
			the_user.image.data = fs.readFileSync(tmp_path);
			the_user.image.contentType = req.files.image.mimetype;
		
			// delete the temporary file
	    	fs.unlink(tmp_path, function(err) {
	        	if (err) throw err;
	    	});
		}


		the_user.save(function(err) {
			res.redirect('../../profile');
		});
	});
});


module.exports = router;
