var express = require('express');
var router = express.Router();

/* GET Pages */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/communities', function(req, res, next) {
	res.render('communities');
});

router.get('/curr_projects', function(req, res, next) {
	res.render('curr_projects');
});

router.get('/settings', function(req, res, next) {
	res.render('settings');
});


module.exports = router;