var express = require('express');
var router = express.Router();

/* GET */
router.get('/editprofile', function(req, res, next) {

	var userString = {
		"email": req.session.user.email,
		"name": req.session.user.fname + " " + req.session.user.lname
	};
	res.render('editprofile', userString);
});

module.exports = router;
