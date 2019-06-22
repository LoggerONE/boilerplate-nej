const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    displayname: {
      type: String,
      trim:true
    }
  });

  UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
  });

mongoose.model('UserModel', UserSchema);

module.exports = mongoose.model('UserModel');