'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var date = new Date();

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

var reviews = {
  name : "Review",
  data : [
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7bd6"),
      "date"                : date,
      "comment"             : "nice job",
      "rating"              : 5
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7bd7"),
      "date"                : date,
      "comment"             : "very kind",
      "rating"              : 4
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7bd8"),
      "date"                : date,
      "comment"             : "awful work",
      "rating"              : 1
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7bd9"),
      "date"                : date,
      "comment"             : "nice and helpful",
      "rating"              : 5
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7be1"),
      "date"                : date,
      "comment"             : "not really good",
      "rating"              : 2
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7be2"),
      "date"                : date,
      "comment"             : "cheap salary",
      "rating"              : 3
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7be3"),
      "date"                : date,
      "comment"             : "perfect job",
      "rating"              : 5
    },
  ]
}
// console.log(reviews.data[2]);
var freelancers = {
  name : 'Freelancer',
  data : [
    {
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bd5"),
      "firstName"     : "Mario",
      "lastName"      : "Rossi",
      "address"       : "Via San Gottardo 12, 6900 Lugano",
      "rating"        : 3,
      "email"         : "mario.rossi@gmail.com",
      "phone_number"  : "+41 4442323223",
      "price"         : 100,
      "profession"    : "Painter",
      "reviews"       : [reviews.data[2]],

    },
    {
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bd6"),
      "firstName"     : "Alexander",
      "lastName"      : "Fischer",
      "address"       : "Via Morobbi 13, 6592 Sant'Antonino",
      "description"   : "I'm the best scrum Master in Lugano.",
      "profession"    : "Cow Master",
      // "category"      : { type: String, enum:['Tecnical Services', 'IT Services', 'Design', 'Management', 'Retail', 'Human Resources', 'Marketing', 'Consulting', 'Advertising', 'Logistics', 'Real Estate', 'Social Work', 'Healthcare'], default:'Other' },
      "category"      : "Management",
      "rating"        : 5,
      "email"         : "alexander.scrummaster@hotmail.ru",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 50,
      "reviews"       : [reviews.data[4]]
    },
    {
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bd7"),
      "firstName"     : "Giovanni",
      "lastName"      : "Rezzonico",
      "address"       : "Via Centrale 42, 6912 Lugano",
      "description"   : "I'm the painter you are searching for",
      "profession"    : "Painter",
      "category"      : "Tecnical Services",
      "rating"        : 4,
      "email"         : "giovanni.rezzonico@gmail.com",
      "phone_number"  : "+41 78 234 77 23",
      "price"         : 20,
      "reviews"       : [reviews.data[3], reviews.data[5]]
    },
    {
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bd8"),
      "firstName"     : "Francesco",
      "lastName"      : "Sani",
      "address"       : "Via Cantonale 9, 6694 Lavizzara",
      "description"   : "Implementing search filtering is my life",
      "profession"    : "Warehouseman",
      "category"      : "Logistics",
      "rating"        : 5,
      "email"         : "francesco@hotmail.ch",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 60,
      "reviews"       : [reviews.data[5]],
    },
    {
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bd9"),
      "firstName"     : "Emanuele",
      "lastName"      : "Giovinazzi",
      "address"       : "Regulastrasse 19, 8046 Zürich",
      "profession"    : "Design",
      "category"      : "Management",
      "rating"        : 1,
      "email"         : "the.painter@hotmail.ch",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 100,
      "reviews"       : [reviews.data[2]],
    },
    {
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bf1"),
      "firstName"     : "GianMarco",
      "lastName"      : "Palazzi",
      "address"       : "Piazza Duomo, 22100 Como",
      "description"   : "I'm your man",
      "profession"    : "Consulting",
      // "category"      : { type: String, enum:['Tecnical Services', 'IT Services', 'Design', 'Management', 'Retail', 'Human Resources', 'Marketing', 'Consulting', 'Advertising', 'Logistics', 'Real Estate', 'Social Work', 'Healthcare'], default:'Other' },
      "category"      : "Management",
      "rating"        : 5,
      "email"         : "real.giamma@hotmail.it",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 100,
      "reviews"       : [reviews.data[3]],
    },

  ]
}

var seedData = [];
seedData.push(freelancers);
seedData.push(users);
seedData.push(reviews)

module.exports = seedData;
