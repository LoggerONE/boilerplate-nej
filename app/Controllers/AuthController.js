var UsersMdl = require('../Models/UserModel');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

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
                const token = jwt.sign({id: userInfo._id}, ENV.APP_KEY, { expiresIn: '1h' });
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

}