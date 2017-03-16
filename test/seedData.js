'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var users = {
 name : 'User',
 data : [
  {
    "firstName"   : "",
   "lastName"     : "",
   "userName"     : "Bob",
   "password"     : "Bob",
   "email"        : "ciaoisnadis",
   "comm_rating"  : 9
  },
 ]
}

var files = {
 name : 'Freelancer',
 data : [
  {
   "firstName"          : "Ciao",
   "lastName"         : "Computer Networking",
   "address"       : "Via coihsaoidf",
   "description"   : "Description",
   "rating" : 3,
   "email" : "ciao@yahoo.com",
   "phone_number" : "+41 4442323223",
   "location" : "Lugano",
   "price" : 300
  }
 ]
}

var seedData = [];
seedData.push(files);
seedData.push(users);

module.exports = seedData;
