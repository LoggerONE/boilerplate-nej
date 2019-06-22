var UsersMdl = require('../Models/UserModel');

const connectDb = () => {
    return mongoose.connect(ENV.DB_URL);
};

//var User = require('mongoose');

exports.signup = function(req, res){

    console.log(req.body)

    UsersMdl.create( {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    },
        function(err, user) {
            if (err){
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
    console.log(email)
    var resData = {
        "state_code" : "100",
        "state_message" : "ok",
        "email" : email
    }
    res.json(resData)
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

}