/** @module models/Freelancer
* The Freelancer Model.
* Schema:
* _id            String       required    Unique identifier of the freelancer.
* firstName      String       required    Name of the freelancer.
* lastName       String       required    Lastname of the freelancer.
* address        String       required    Address of the freelancer.
* description    String       optional    Description of the freelancer.
* profession     String       optional    Job category of the freelancer.
* rating         Integer      optional    Rating of the freelancer.
* email          String       required    Email of the freelancer.
* phone number   String       required    Phone number of the freelancer.
* location       String       required    Location of the freelancer.
* price          Integer      optional    Average price of the freelancer.
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
const FreelancerSchema = new mongoose.Schema(
  {
    firstName : { type: String, required: true },
    lastName : { type: String, required: true },
    address : { type: String, required: true },
    description : { type: String},
    profession :{ type: String, default: 'Other'},
    rating: { type: Number },
    email: { type: String, required : true},
    phone_number: { type: String, required : true},
    location: { type: String, required: true },
    price:{ type: Number },
    image: {type: String, default: '/src/images/blank-user.jpg'},
  }
);

FreelancerSchema.pre('save', function (next) {
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

FreelancerSchema.pre('save', function(next) {
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


FreelancerSchema.methods.isValidPassword = function isValidPassword(candidate, callback) {
  bcrypt.compare(candidate, this.password, function onPwdCompare(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};
//register model
mongoose.model('Freelancer', FreelancerSchema);
