'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var users = {
  name : 'User',
  data : [
    {
      "firstName"    : "",
      "lastName"     : "",
      "userName"     : "Bob",
      "password"     : "Bob",
      "email"        : "ciaoisnadis",
      "comm_rating"  : 9
    },
  ]
}

var freelancer = {
  name : 'Freelancer',
  data : [
    {
      "firstName"     : "Mario",
      "lastName"      : "Rossi",
      "address"       : "Via san gottardo 12",
      "description"   : "Description",
      "rating"        : 3,
      "email"         : "ciao@yahoo.com",
      "phone_number"  : "+41 4442323223",
      "location"      : "Lugano",
      "price"         : 300,
      "profession"    : "Painter"
    },
    {
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bd5"),
      "firstName"     : "Luca",
      "lastName"      : "Bernasconi",
      "address"       : "Via coihsaoidf",
      "description"   : "Description",
      "rating"        : 3,
      "email"         : "ciao@yahoo.com",
      "phone_number"  : "+41 4442323223",
      "location"      : "Bellinzona",
      "price"         : 300,
      "profession"    : "Plumber"
    },
    {
      "firstName"     : "Giovanni",
      "lastName"      : "Rezzonico",
      "address"       : "Via coihsaoidf",
      "description"   : "Description",
      "rating"        : 3,
      "email"         : "ciao@yahoo.com",
      "phone_number"  : "+41 4442323223",
      "location"      : "Lugano",
      "price"         : 300,
      "profession"    :"painter"
    }
  ]
}

var seedData = [];
seedData.push(freelancer);
seedData.push(users);

module.exports = seedData;
