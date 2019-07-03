const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
// require Controllers
const MailerCtr = require('./MailerController')

// require Models
const UsersMdl = require('../Models/UserModel');

const tokenList = {}


//var User = require('mongoose');

exports.signup = function(req, res){

    UsersMdl.create( {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    },
        function(err, user) {
            if (err){
                console.log(err)
                var resData = {
                    "state_code" : "200",
                    "state_message" : "error"
                }
                return res.status(500).json(resData);
            } 
        res.status(200).send(user);
    });

    
};

exports.signin = function(req, res) {

    var email = req.body.email; 
    var password = req.body.password;
    
    UsersMdl.findOne({email:req.body.email}, function(err, userInfo){
        if (err) {
            var resData = {
                "state_code" : "200",
                "state_message" : "error"
            }
            return res.status(500).json(resData);
            
        } else {

            if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({id: userInfo._id}, ENV.APP_KEY, { expiresIn: ENV.JWT_ACCESS_TOKEN_LIFETIME });
                const refreshToken = jwt.sign({id: userInfo._id}, ENV.APP_KEY, { expiresIn: ENV.JWT_REFRESH_TOKEN_LIFETIME })
                
                var testSet = {
                    'token' : token,
                    'refreshToken' : refreshToken
                }

                // Set User Access Token and Refresh Token
                redis_common.set('user:' + userInfo._id, JSON.stringify(testSet) );

                res.json({status:"success", message: "success", data:{
                        user: userInfo.username, 
                        token : token,
                        refreshToken : refreshToken
                    }});
            }else{
                res.json({status:"error", message: "Invalid email/password", data:null});
            }
        }
    });

};

/* Send Code for change password */
exports.sendChPassCode = function(req, res){
    var resData = {
        "state_code" : "200",
        "state_message" : "error"
    }

        console.log(req.body)
    
    if(req.body.email == ''){
        return res.status(500).json(resData);
    }else{

        UsersMdl.findOne({email:req.body.email}, function(err, userInfo){
            if (err) { // User doesn't exists
                var resData = {
                    "state_code" : "201",
                    "state_message" : "error"
                }
                return res.status(500).json(resData);
                
            } else {
    
                //console.log(userInfo.email)
                var authCode = uuid()
                var expireTime = 60*Number(ENV.FINDPASSWORD_CODE_EXPIRE)
                var setData = {
                    user_id : userInfo._id
                }

                var collection_chPassCode = 'chPassCode:' + authCode.toString()
                
                redis_common.set(collection_chPassCode, JSON.stringify(setData) )
                redis_common.expire(collection_chPassCode, expireTime)

                var chPassAuthUrl = ENV.APP_URL + "/auth/chPass/" + authCode
                console.log(authCode)
                MailerCtr.sendMail(ENV.SMTP_NOREPLY_USER, userInfo.email, 'Change Passworkd link', chPassAuthUrl);
            }
        });

    }
    
    

    /*
     * exports.sendMail = function(mailFrom, mailTo, subject, text, html){ 
     */
    //MailerCtr.sendMail('noreply@wrdevs.com','dnejrwhd@gmail.com', 'change Password', 'hi');
    res.json(resData)
}

exports.chPass = function(req, res){
    var resData = {
        "state_code" : "100",
        "state_message" : "success"
    }
    return res.json(resData);
}

exports.refresh = function(req, res){
    const postData = req.body

    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "email": postData.email,
            "name": postData.name
        }
        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
        const response = {
            "token": token,
        }
        // update the token in the list
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
    }    

}