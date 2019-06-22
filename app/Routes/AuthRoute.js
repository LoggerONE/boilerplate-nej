const express = require('express')
const router = express.Router()

var AuthCtr = require('../Controllers/AuthController');

/* Router Signin */
router.get('/', [], function(req, res, next) {
	res.render('auth/signin');
});
router.post('/signin', AuthCtr.signin)


/* Router SingUp */
router.get('/signup', [], function(req, res, next) {

	res.render('auth/signup');
}).post('/signup',[], AuthCtr.signup)

/* Router FindPassword */
router.get('/findPassword', [], function(req, res, next) {
	var resData = {
		"state_code" : "100",
		"state_message" : "ok" 
	}

	console.log(req.params.authCode)
	res.render('auth/findPassword',resData);
}).post('/findPassword',[], AuthCtr.sendChPassCode);

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
}).post('/chpass',[], AuthCtr.chPass)

/*
	Token expire refresh token
*/
router.post('/refresh', [], AuthCtr.refresh)

module.exports = router