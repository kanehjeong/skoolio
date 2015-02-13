var express = require('express');
var router = express.Router();

/* GET */
router.get('/projectDetails', function(req, res, next) {
	res.render('projectDetails');
});

module.exports = router;
