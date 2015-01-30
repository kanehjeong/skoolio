var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/editprofile', function(req, res, next) {
	res.render('editprofile', { title: 'Express' });
});

router.get('/communities', function(req, res, next) {
	res.render('communities', { title: 'Express' });
});

router.get('/chatbox', function(req, res, next) {
	res.render('chatbox', { title: 'Express' });
});

router.get('/settings', function(req, res, next) {
	res.render('settings', { title: 'Express' });
});

module.exports = router;
