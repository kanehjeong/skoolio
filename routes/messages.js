var express = require('express');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var User = require('../models/user');

var app = express();
var router = express.Router();

/* GET */
router.get('/messages', function(req, res, next) {
	res.render('messages');
});

module.exports = router;