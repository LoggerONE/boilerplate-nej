const express = require('express')
const router = express.Router()

var AuthCtr = require('../Controllers/AuthController');


/*****************************
	Router SingUp 
*****************************/
router.get('/signup', [], function(req, res, next) {

	res.render('auth/signup');
}).post('/signup',[], AuthCtr.signup)


/*****************************
 *  Router Signin
 *****************************/
router.get('/', [], function(req, res, next) {
	res.render('auth/signin');
});
router.post('/signin', AuthCtr.signin)


/*****************************
 *  Router FindPassword
 *****************************/
router.get('/findPassword', [], function(req, res, next) {
	var resData = {
		"state_code" : "100",
		"state_message" : "ok" 
	}

	res.render('auth/findPassword',resData);
}).post('/findPassword',[], AuthCtr.sendChPassCode);

/*****************************
 *  Change Password
 *  express optional params :params?
 *****************************/
router.get('/chpass/:chPassCode', [], function(req, res, next) {
	var resData = {
		"state_code" : "100",
		"state_message" : "ok" 
	}

	//Check redis authCode doesn't expire
	redis_common.get('chPassCode:' + req.params.chPassCode, function(err, reply){
		console.log(reply)
	})

	console.log(req.params.chPassCode)
	res.render('auth/chPass',resData);
}).post('/chpass',[], AuthCtr.chPass)

/*****************************
 * Token expire refresh token
*****************************/
router.post('/refresh', [], AuthCtr.refresh)

module.exports = router