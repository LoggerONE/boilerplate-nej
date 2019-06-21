const express = require('express');
const router = express.Router();


/* Page Signin */
router.get('/', [], function(req, res, next) {
	var resData = {
		"state_code" : "100",
		"state_message" : "ok" 
	}
	res.render('auth/signin',resData);
});

/* Page SingUp */
router.get('/signup', [], function(req, res, next) {
	var resData = {
		"state_code" : "100",
		"state_message" : "ok" 
	}
	res.render('auth/signup',resData);
});

/* Page FindPassword */
router.get('/findPassword', [], function(req, res, next) {
	var resData = {
		"state_code" : "100",
		"state_message" : "ok" 
	}

	console.log(req.params.authCode)
	res.render('auth/findPassword',resData);
});
/*
  express optional params :params?
*/
router.get('/chpass/:authCode', [], function(req, res, next) {
	var resData = {
		"state_code" : "100",
		"state_message" : "ok" 
	}

	console.log(req.params.authCode)
	res.render('auth/findPassword',resData);
});

module.exports = router;