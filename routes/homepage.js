var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var mongoose = require('mongoose');
var User = require('../models/user');
var Project = require('../models/project');
var fs = require('fs');

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
					pMap["user"] = [];

					projects.forEach(function(element, index, array) {

						// make sure interested button is only shown to those who do not own the project
						var notowned = element.createdByID != req.session.user._id;
						var border;

						if(notowned) {
							border = "post-border-not-owned";
						} else {
							border = "post-border-owned";
						}

						var urlExist = false;
						var courseExist = false;
						var imageExist = false; 

						var url = "";
						var course = "";
						var imageData = "";
						
						if( !(element.url === undefined) ) {
							urlExist = true;
							url = element.url;
						}

						if( !(element.course === undefined) ) {
							courseExist = true;
							course = element.course;
						}

						if( !(element.images.data === undefined) ) {
							imageExist = true;

							// need to decode image as base64 so html can read it
							imageData = element.images.data.toString('base64');
						}

						var elementString = {
							"_id": element._id,
							"createdAt": element.createdAt.toString().substring(4,15),
							"title": element.title,
							"type": element.type,
							"description": element.description,
							"createdBy": element.createdBy,
							"createdByID": element.createdByID,
							"roles": element.roles.join(', '),
							"notowned": notowned,
							"post-border": border,
							"url-exist": urlExist,
							"url": url,
							"course-exist": courseExist,
							"course": course,
							"image-exist": imageExist,
							"image-contentType": element.images.contentType,
							"image-data": imageData
						};
						pMap["projects"].push(elementString);

					});

					/* check if new user to see if welcome modal should pop up */
					var newUser = req.session.user.newUser;

					if(newUser) {
						User.findById(req.session.user._id, function(err, the_user) {
							if(err) {
								console.log(err);
							}

							req.session.user.newUser = false;
							the_user.newUser = false;
							the_user.save(function(err) {
								if(err) {
									console.log(err);
								}
							});
						});
					}

					var userString = {
						"email": req.session.user.email,
						"name": req.session.user.fname + " " + req.session.user.lname,
						"new": newUser
					};
					pMap["user"].push(userString);

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

	if (typeof req.body.roles === "string") {
		req.body.roles = [req.body.roles];
	}
	else {
		req.body.roles = cleanArray(req.body.roles);
	}

	var newProject = new Project(req.body);

	if(!(req.files.images === undefined)) {
		var tmp_path = req.files.images.path;
	
		newProject.images.data = fs.readFileSync(tmp_path);
		newProject.images.contentType = req.files.images.mimetype;
	

		// delete the temporary file
    	fs.unlink(tmp_path, function(err) {
        	if (err) throw err;
    	});
	}

	newProject.save(function(err) {

		if(err) {
			return res.send(err);
		}
		else {
			res.redirect("/homepage");
		}
	});
});



/* GET */
router.get('/homepage/search', function(req, res, next) {

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

	        	var filter = req.query.filter;
	        	var search = req.query.search;
	        	var query;

	        	// check for which query to exec to filter search by
	        	switch(filter) {
			    	case 'stitle':
			        	query = Project.find({ title : search }).sort({'createdAt' : 'desc'})
			        	break;
			    	case 'stype':
			        	query = Project.find({ type : search }).sort({'createdAt' : 'desc'})
			        	break;
			        case 'srole':
			        	query = Project.find({ roles : search }).sort({'createdAt' : 'desc'})
			        	break;
			        case 'scourse':
			        	query = Project.find({ course : search }).sort({'createdAt' : 'desc'})
			        	break; 	
			    	default:
			    	    break;
				}
				
	    		query.exec(function(err, projects) {
					
					if(err) {
						res.send(err);
						return;
					}

					var pMap = {};
					pMap["projects"] = [];
					pMap["user"] = [];

					projects.forEach(function(element, index, array) {

						// make sure interested button is only shown to those who do not own the project
						var notowned = element.createdByID != req.session.user._id;
						var border;

						if(notowned) {
							border = "post-border-not-owned";
						} else {
							border = "post-border-owned";
						}

						var elementString = {
							"_id": element._id,
							"createdAt": element.createdAt.toString().substring(4,15),
							"title": element.title,
							"type": element.type,
							"description": element.description,
							"createdBy": element.createdBy,
							"createdByID": element.createdByID,
							"roles": element.roles.join(', '),
							"notowned": notowned,
							"post-border": border
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




/* Gets rid of all false values (0, null, underfined, false) in array */
function cleanArray(actual){
  var newArray = new Array();
  for(var i = 0; i<actual.length; ++i){
      if (actual[i]){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}

module.exports = router;
