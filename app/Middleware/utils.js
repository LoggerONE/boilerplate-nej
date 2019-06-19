module.exports.csrf = function csrf(req, res, next){
	res.locals.token = req.csrfToken();
	next();
};
/*
module.exports.authenticated = function authenticated(req, res, next){
	if (typeof req.session.passport !== 'undefined') {
	    // the variable is defined
	    req.session.isAuthenticated = req.session.passport.user !== undefined;
	}
	
	res.locals.isAuthenticated = req.session.isAuthenticated;
	
	
	if(req.session.isAuthenticated)	{
		res.locals.user = req.session.passport.user;
	}
	next();
};
*/
module.exports.matchingIP = function matchingIP(req, res, next){

	var allowed_ips = ENV.ALLOWED_AUTH_IPS;
	var user_ip = req.headers['x-forwarded-for'];
	allowed_ips = allowed_ips.split(',');

	if(typeof allowed_ips.indexOf(user_ip) !== "undefined"){
		next();
	}else{
		res.redirect('/auth');
	}
};

module.exports.uploadData = function uploadData(req, res, next){
	/*
	var formidable = require('formidable');
	var form = new formidable.IncomingForm();
	form.multiples = true;	
    form.parse(req,function(err,fields,files){
        var jwToken = fields.token;
		var jwt = require('jwt-simple');
		var serverToken = '';
		var decoded = jwt.decode(jwToken, serverToken);
		
    });
    */
	next();
	/*
	*/
	//console.log(decoded.institute_code);
	//console.log(decoded.user_id);		
	//var institute = res.instituteCode;
	//next();
	//console.log(req);

	/*
	console.log(typeof req.headers.referer);
	if(typeof req.headers.referer == "string"){
		var jwt = require('jwt-simple');
		var jwToken = req.params.jwToken;
		var instituteCode = req.params.instituteCode;	
		var serverToken = '';
		var decoded = jwt.decode(jwToken, serverToken);
		console.log(decoded); //=> { foo: 'bar' } 	
		console.log("jwt : ", jwToken);		
		next();		
	}else{
		res.render('v1/_errors/not_allowed_url');
	}
	*/
};

module.exports.requireJWT = function requireJWT(req, res, next){
	try{
		//console.log(req);
		if(typeof req.headers.referer == "string"){
			var jwt = require('jwt-simple');
			var jwToken = req.params.jwToken;
			var organizationCode = req.params.organizationCode;
	
			redis_public_api.get(ENV.REDIS_PUBLIC_API_KEYPREFIX + organizationCode, function(err, reply){
				//console.log(reply);
				//console.log(req.session);
				var secretToken = reply;
				//console.log(jwToken);
				var decoded = jwt.decode(jwToken, secretToken, true);
				
				next();
			});
	
			
		}else{
			res.render('v1/_errors/not_allowed_url');
		}
		
	}catch(e){
		console.log(e)
	}

};

module.exports.allow_cors = function allow_cors(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
    res.setHeader('Access-Control-Allow-Credentials', true);
	next();
};



module.exports.requireAuthentication = function requireAuthentication(req, res, next){
	//console.log(req.session.isAuthenticated);
	if(req.session.isAuthenticated){
		next();
	}else{
		res.redirect('/auth');
	}
};

module.exports.noAuth = function noAuth(req, res, next){
	//console.log(req.session.isAuthenticated);
	if(req.session.isAuthenticated){
		res.redirect('/');		
	}else{
		next();

	}
};

module.exports.logOut = function logOut(req){
	console.log("Logout");
	req.session.isAuthenticated = false;
	req.session.destroy();
};