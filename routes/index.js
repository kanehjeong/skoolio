var express = require('express');
var router = express.Router();

/* GET Pages */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/editprofile', function(req, res, next) {
	res.render('editprofile', { title: 'Express' });
});

router.get('/communities', function(req, res, next) {
	res.render('communities', { title: 'Express' });
});

router.get('/curr_projects', function(req, res, next) {
	res.render('curr_projects', { title: 'Express' });
});

router.get('/settings', function(req, res, next) {
	res.render('settings', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Express' });
});

router.get('/homepage', function(req, res, next) {
	res.render('homepage', { title: 'Express' });
});

module.exports = router;
