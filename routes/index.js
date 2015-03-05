var express = require('express');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var User = require('../models/user');
var mongoose = require('mongoose');

var app = express();
var router = express.Router();

// get current db connection
var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }));

/* GET */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/account_created', function(req, res, next) {
    res.render('account_created');
});

module.exports = router;