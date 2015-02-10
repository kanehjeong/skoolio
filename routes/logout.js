var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res, next) {
	res.render('logout');
});

router.post('/logout', function(req, res, next) {
	console.log("LOGGED OUT");

    //get out of current session
    req.session.reset();
    res.redirect('/logout');
});


module.exports = router;