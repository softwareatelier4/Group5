/** @module models/Album
* The Album Model.
* Schema:
* _id            String       required   Unique identifier of the album
* name           String       required   Name of the album
* artist         ObjectId     required   Artist who performs in this album. It should be the `_id` of an Artist model document.
* artwork        String       optional   URL of the artwork picture for the album. Default ''
* tracks         [ObjectId]   required   Tracks that this album contains. They should be `_id`s of Track Model documents.
* dateCreated    Date         required   Date the album was created. Default: Date.now()
* dateReleased   Date         required   Date the album was released. Default: Date.now()
* label          String       optional   Record label of this album. Default: 'USI-INF records'
*/


'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const ObjectId = mongoose.Schema.Types.ObjectId;


/** @constructor
* @augments AbstractSoundCollectionSchemaInstance
* @param {Object} definition
*/
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
