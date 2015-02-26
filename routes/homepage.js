var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var mongoose = require('mongoose');
var User = require('../models/user');
var Project = require('../models/project');

var db = mongoose.connection;

/* GET */
router.get('/homepage', function(req, res, next) {

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

	    		Project.find({}).sort({'createdAt' : 'desc'}).exec(function(err, projects) {
					
					if(err) {
						res.send(err);
						return;
					}

					var pMap = {};
					pMap["projects"] = [];

					projects.forEach(function(element, index, array) {

						// make sure interested button is only shown to those who do not own the project
						var notowned = element.createdByID != req.session.user._id;

						var elementString = {
							"_id": element._id,
							"createdAt": element.createdAt.toString().substring(4,15),
							"title": element.title,
							"type": element.type,
							"description": element.description,
							"createdBy": element.createdBy,
							"createdByID": element.createdByID,
							"roles": element.roles.join(', '),
							"notowned": notowned
						};
						pMap["projects"].push(elementString);
					});

					res.render('homepage', pMap);
	    		});
	    	}
	    });
		
	} else {
	    res.redirect('/');
	}
});

/* POST */
router.post('/homepage', function(req, res, next) {

	// set the created by property to be current user
	req.body.createdBy = req.session.user.fname + " " + req.session.user.lname;
	req.body.createdByID = req.session.user._id;

	req.body.roles = cleanArray(req.body.roles);

	var newProject = new Project(req.body);

	newProject.save(function(err) {

		if(err) {
			return res.send(err);
		}
		else {
			res.redirect("/homepage");
		}
	});
});


/* Gets rid of all false values (0, null, underfined, false) in array */
function cleanArray(actual){
  var newArray = new Array();
  for(var i = 0; i<actual.length; i++){
      if (actual[i]){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}

module.exports = router;
