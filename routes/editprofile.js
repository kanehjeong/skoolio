var express = require('express');
var router = express.Router();

/* GET */
router.get('/editprofile', function(req, res, next) {

	console.log(req.session.user.fname);
	res.render('editprofile');
});

module.exports = router;
