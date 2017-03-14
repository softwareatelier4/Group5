/** @module models/User
* The User Model.
* Schema:
* userName        String       required   Username
* firstName       String       required   First Name of the user.
* lastName        String       optional   Last Name of the user.
* password        String       required   Password
* email           String       required   user email
* comm_rating     Number       required   Rating of comments he receives (0-10);
*/


'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const ObjectId = mongoose.Schema.Types.ObjectId;


const userSchema = new mongoose.Schema(
  {
    userName : { type: String, required: true },
    firstName: { type: String },
    lastName : { type: String },
    password : { type: String, required: true },
    email   : { type: String, required: true },
    comm_rating : { type: Number }
  }
);

userSchema.pre('save', function (next) {
  //default for firstName is userName
  if( this.firstName === undefined
    || this.firstName === null
    || this.firstName.toString().trim() === ''){
    this.firstName = this.userName;
  }

  //default for lastName is userName
  if( this.lastName === undefined
    || this.lastName === null
    || this.lastName.toString().trim() === ''){
    this.lastName = this.userName;
  }
  return next();
});

userSchema.pre('save', function(next) {
  const user = this;

  // return if the password was not modified.
  if (!user.isModified('password')) { return next(); }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) { return next(err); }

      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) { return next(err); }

          user.password = hash;
          next();
      });
  });
});


userSchema.methods.isValidPassword = function isValidPassword(candidate, callback) {
  bcrypt.compare(candidate, this.password, function onPwdCompare(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

//register model
mongoose.model('User', userSchema);
