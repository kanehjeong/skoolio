var express = require('express');
var router = express.Router();

/* GET */
router.get('/homepage', function(req, res, next) {
	res.render('homepage');
});

module.exports = router;
