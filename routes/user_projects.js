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
						pMap["projects"] = [];
						pMap["user"] = [];

						projects.forEach(function(element, index, array) {

							var isWebApp = element.type === "Web Application";
							var isAndroidApp = element.type === "Android Application";
							var isIphoneApp = element.type === "Iphone Application";
							var isResearch = element.type === "Research";
							var isEngineer = element.type === "Engineer";
							var isOther = element.type === "Other";

							var elementString = {
								"_id": element._id,
								"createdAt": element.createdAt.toString().substring(4,15),
								"title": element.title,
								"type": element.type,
								"description": element.description,
								"createdBy": element.createdBy,
								"createdByID": element.createdByID,
								"roles": element.roles.join(', '),
								"rolesArr": element.roles,
								"webApp": isWebApp,
								"androidApp": isAndroidApp,
								"iphoneApp": isIphoneApp,
								"research": isResearch,
								"engineer": isEngineer,
								"other": isOther
							};
							pMap["projects"].push(elementString);

						});

						var userString = {
							"email": req.session.user.email,
							"name": req.session.user.fname + " " + req.session.user.lname
						};
						pMap["user"].push(userString);

						res.render('user_projects', pMap);
	    			});
	    	}
	    });
		
	} else {
	    res.redirect('/');
	}
});

router.post('/user_projects/:id/delete', function(req, res, next) {
	var projectID = req.params.id;

	Project.findOne({ "_id": projectID }).remove().exec( function(err) {
		if(err) {
			console.log(err);
		}

		res.redirect('../../user_projects');
	});
});

router.post('/user_projects/:id/edit', function(req, res, next) {
	var projectID = req.params.id;

	Project.findById(projectID, function(err, project) {
		if (err) {
			console.log(err);
		}

		project.title = req.body.title;
		project.type = req.body.type;
		project.roles = req.body.roles;
		project.description = req.body.description;
		project.createdAt = new Date();

		project.save(function(err) {
			if(err) {
				console.log(err);
			}

			res.redirect('../../user_projects');
		});
	});
});

module.exports = router;
