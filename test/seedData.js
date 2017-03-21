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
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bd5"),
      "firstName"     : "Mario",
      "lastName"      : "Rossi",
      "address"       : "Via San Gottardo 12, 6900 Lugano",
      "description"   : "Description here",
      "rating"        : 3,
      "email"         : "mario.rossi@gmail.com",
      "phone_number"  : "+41 4442323223",
      "location"      : "Lugano",
      "price"         : 100,
      "profession"    : "Painter"
    },
    {
      "firstName"     : "Luca",
      "lastName"      : "Bernasconi",
      "address"       : "Via stazione 22, 6500 Bellinzona",
      "description"   : "Description",
      "rating"        : 3,
      "email"         : "luca.bernasconi@yahoo.com",
      "phone_number"  : "+41 79234729",
      "location"      : "Bellinzona",
      "price"         : 120,
      "profession"    : "Plumber"
    },
    {
      "firstName"     : "Giovanni",
      "lastName"      : "Rezzonico",
      "address"       : "Via Centrale 42, 6912 Lugano",
      "description"   : "Description",
      "rating"        : 3,
      "email"         : "giovanni.rezzonico@gmail.com",
      "phone_number"  : "+41 782347723",
      "location"      : "Lugano",
      "price"         : 95,
      "profession"    : "Painter"
    }
  ]
}

var seedData = [];
seedData.push(freelancer);
seedData.push(users);

module.exports = seedData;
