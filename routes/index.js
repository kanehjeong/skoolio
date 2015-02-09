var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var mongoose = require('mongoose');

var app = express();
var router = express.Router();

// get current db connection
var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }));

/* GET Pages */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/account_created', function(req, res, next) {
	res.render('account_created');
});

router.get('/curr_projects', function(req, res, next) {
	res.render('curr_projects');
});

router.get('/settings', function(req, res, next) {
	res.render('settings');
});

/* POST */
router.post('/', function(req, res, next) {

    // attempt to authenticate user
    User.getAuthenticated(req.body.email, req.body.password, function(err, user, reason) {
        if (err) throw err;

        // login was successful if we have a user
        if (user) {
            // handle login success
            console.log('login success');
            res.redirect('/homepage');
            return;
        }

        // otherwise we can determine why we failed
        var reasons = User.failedLogin;
        switch (reason) {
            case reasons.NOT_FOUND:
            case reasons.PASSWORD_INCORRECT:
                // note: these cases are usually treated the same - don't tell
                // the user *why* the login failed, only that it did
                res.send('Incorrect Login Information.');
                break;
            case reasons.MAX_ATTEMPTS:
                // send email or otherwise notify user that account is
                // temporarily locked
                res.send('Exceeded Login Attempts. Account Locked for 5 Minutes.');
                break;
        }

    });

});

module.exports = router;