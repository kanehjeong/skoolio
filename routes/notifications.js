var express = require('express');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var User = require('../models/user');

var app = express();
var router = express.Router();

/* GET */
router.get('/notifications', function(req, res, next) {
	res.render('notifications');
});

module.exports = router;