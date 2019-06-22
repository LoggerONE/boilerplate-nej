var UsersMdl = require('../Models/UsersModel');

const connectDb = () => {
    return mongoose.connect(ENV.DB_URL);
};

exports.signup = function(req, res){
    var email = req.params.email;


    res.json(email)
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