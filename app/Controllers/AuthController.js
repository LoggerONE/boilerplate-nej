var UsersMdl = require('../Models/UsersModel');

exports.signin = function(req, res) {
    var resData = {
        "state_code" : "100",
        "state_message" : "ok",
    }
    res.json(resData);
};


exports.signup = function(req, res){
    var resData = {
        "state_code" : "100",
        "state_message" : "ok",
    }
    res.json(resData);
};

// Change Password
exports.sendChPassCode = function(req, res){

}

exports.chPass = function(req, res){

}