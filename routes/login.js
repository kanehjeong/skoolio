var express = require('express');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var User = require('../models/user');

var app = express();
var router = express.Router();

/* POST */
router.post('/login', function(req, res, next) {

    // attempt to authenticate user
    User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason) {
        if (err) {
            throw err;
        }

        // login was successful if we have a user
        if (user) {

            // handle login success
            req.user = user;
            req.session.user = user;

            // delete the password from the session for security
            delete req.user.password; 
            
            //woopra.identify({
                //email: req.session.user.email,
                //name: req.session.user.fname + " " + req.session.user.lname
            //});

            //woopra.track();

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