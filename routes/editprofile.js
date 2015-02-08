var express = require('express');
var router = express.Router();

/* GET */
router.get('/editprofile', function(req, res, next) {
	res.render('editprofile');
});

module.exports = router;
