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

						// Should only get here if no projects
						if(projects.length === 0) {

							var noProjectObj = {
								"empty": true,								
							};

							res.render('user_projects', noProjectObj);
						}
						else{


							var pMap = {};
							pMap["projects"] = [];
							pMap["user"] = [];

							projects.forEach(function(element, index, array) {

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



								var isWebApp = element.type === "Web Application";
								var isAndroidApp = element.type === "Android Application";
								var isIphoneApp = element.type === "Iphone Application";
								var isResearch = element.type === "Research";
								var isElectrical = element.type === "Electrical";
								var isOther = element.type === "Other";
								var isDesign = element.type === "Design";
								var isMarketing = element.type === "Marketing";
								var isTheatre = element.type === "Theatre";
								var isFilm = element.type === "Film";
								var isBook = element.type === "Book";
								var isArt = element.type === "Art";

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
									"electrical": isElectrical,
									"other": isOther,
									"design": isDesign,
									"marketing": isMarketing,
									"theatre": isTheatre,
									"film": isFilm,
									"book": isBook,
									"art": isArt,

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

							var userString = {
								"email": req.session.user.email,
								"name": req.session.user.fname + " " + req.session.user.lname
							};
							pMap["user"].push(userString);

							res.render('user_projects', pMap);
						}
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

		if(!(req.files.images === undefined)) {
			var tmp_path = req.files.images.path;
		
			project.images.data = fs.readFileSync(tmp_path);
			project.images.contentType = req.files.images.mimetype;
		
			// delete the temporary file
	    	fs.unlink(tmp_path, function(err) {
	        	if (err) throw err;
	    	});
		}

		if(!(req.body.url === undefined)) {
			project.url = req.body.url;
		}

		if(!(req.body.course === undefined)) {
			project.course = req.body.course;
		}

		project.save(function(err) {
			if(err) {
				console.log(err);
			}

			res.redirect('../../user_projects');
		});
	});
});

module.exports = router;
