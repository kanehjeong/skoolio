var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var mongoose = require('mongoose');
var User = require('../models/user');
var Project = require('../models/project');
var Notification = require('../models/notification');

var db = mongoose.connection;

/* POST */
router.post('/interested/:id', function(req, res, next) {
	
	// Check if session exists
	if (req.session && req.session.user) {

		var projectID = req.params.id;
		Project.findOne({ '_id' : projectID }).exec(function(err, project) {

			var message = "Hello, my name is " + req.session.user._fname + " " + req.session.user.lname + " and I am interested in this project!";
			
			if(!(req.body.message === undefined)) {
				message = req.body.message;
			}

			var newNotification = new Notification({
				fromID: req.session.user._id,
				toID: project.createdByID,
				from: req.session.user.fname + " " + req.session.user.lname,
				to: project.createdBy,
				project: project.title,
				projectID: projectID,
				roles: req.body.roles,
				message: message
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
