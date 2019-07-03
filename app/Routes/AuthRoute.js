const express = require('express')
const router = express.Router()

var AuthCtr = require('../Controllers/AuthController')


/*****************************
	Router SingUp 
*****************************/
router.get('/signup', [], function(req, res, next) {

	res.render('auth/signup')
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
}).post('/findPassword',[], AuthCtr.sendChPassCode)

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
	var chPassCodeCollection = 'chPassCode:' + req.params.chPassCode
	redis_common.get(chPassCodeCollection, function(err, reply){
		

		
		if(err){
			var resData = {
				"state_code" : "201",
				"state_message" : "error"
			}
			return res.status(500).json(resData);			
		}

		if(reply != null){ // chPassCode exists
			
			//Expire chPassCode Collection
			redis_common.del(chPassCodeCollection)

			var chPassData = JSON.parse(reply)
			var user_id = chPassData.user_id
			
			/* Test Code */
			var resData = {
				"state_code" : "100",
				"state_message" : "code Success"
			}
			return res.json(resData);	

			//res.render('auth/chPass',resData)
		}else{// chPassCode doesn't exists
			var resData = {
				"state_code" : "201",
				"state_message" : "code expired"
			}
			return res.status(500).json(resData);	
		}

		
	})


}).post('/chpass',[], AuthCtr.chPass)

/*****************************
 * Token expire refresh token
*****************************/
router.post('/refresh', [], AuthCtr.refresh)

module.exports = router