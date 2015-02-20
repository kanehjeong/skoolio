var express = require('express');
var router = express.Router();
var Project = require('../models/project');

/* GET */
router.get('/project_details/:id', function(req, res, next) {
	var projectID = req.params.id;

	Project.findOne({ "_id": projectID }).exec( function(err, project) {
		if(err) {
			console.log(err);
		}

		console.log(project);
		res.render('project_details', project);
	});

});

module.exports = router;
