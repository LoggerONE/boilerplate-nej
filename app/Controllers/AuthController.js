var UsersMdl = require('../Models/UserModel');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const tokenList = {}

const connectDb = () => {
    return mongoose.connect(ENV.DB_URL);
};

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
                var testSet = {
                    'token' : token
                }

                // Set User Access Token and Refresh Token
                redis_common.set('user:' + userInfo._id, JSON.stringify(testSet) );

                console.log(token)
                res.json({status:"success", message: "success", data:{user: userInfo.username, token:token}});
            }else{
                res.json({status:"error", message: "Invalid email/password", data:null});
            }
        }
    });

};

/* Send Code for change password */
exports.sendChPassCode = function(req, res){
    var resData = {
        "state_code" : "100",
        "state_message" : "ok",
    }
    res.json(resData)
}

exports.chPass = function(req, res){

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