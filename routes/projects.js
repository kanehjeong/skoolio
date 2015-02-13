var express = require('express');
var router = express.Router();

/* GET */
router.get('/projects', function(req, res, next) {

	console.log(req.session.user.fname);
	res.render('projects');
});

module.exports = router;
