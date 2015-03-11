var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res, next) {

    //get out of current session
    req.session.reset();

	res.redirect('/');
});

module.exports = router;