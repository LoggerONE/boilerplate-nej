const express = require('express');
const router = express.Router();

router.get('/', [], function(req, res, next) {
	var resData = {
		"state_code" : "100",
		"state_message" : "ok" 
	}
	res.render('welcome',resData);
});


module.exports = router;