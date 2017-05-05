'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var date = new Date();

var events = {
  name : 'CalendarEvent',
  data : [
    {
      "location"    : "Lugano",
      "description" : "Riparazione tubatura sig.ra Bianchi",
      "start"       : new Date(2017, 1, 1, 10, 30),
      "end"         : new Date(2017, 1, 1, 12, 30)
    },
    {
      "location"    : "Bellinzona",
      "description" : "Riparazione tetto sig.ra Bianchi",
      "start"       : new Date(2017, 1, 1, 10, 30),
      "end"         : new Date(2017, 1, 1, 12, 30)
    },
    {
      "location"    : "Locarno",
      "description" : "Riparazione doccia sig.ra Bianchi",
      "start"       : new Date(2017, 1, 1, 10, 30),
      "end"         : new Date(2017, 1, 1, 12, 30)
    },
    {
      "location"    : "Milano",
      "description" : "Riparazione finestra sig.ra Bianchi",
      "start"       : new Date(2017, 1, 1, 10, 30),
      "end"         : new Date(2017, 1, 1, 12, 30)
    }
  ]
}
var users = {
  name : 'User',
  data : [
    {
      "_id"       : ObjectId("2625fc2bd89b84023d8c7bd6"),
      "userName"  : "camo",
      "firstName" : "",
      "lastName"  : "",
      "password"  : "camo",
      "email"     : "camo@me.ch",
      "userType"  : "Admin"
    },
    {
      "userName"  : "ema",
      "firstName" : "",
      "lastName"  : "",
      "password"  : "ema",
      "email"     : "ema@me.ch",
      "userType"  : "Normal"
    },
    {
      "userName"  : "fischer",
      "firstName" : "",
      "lastName"  : "",
      "password"  : "fischer",
      "email"     : "fischer@me.ch",
      "userType"  : "Freelancer"
    },
    {
      "userName"  : "sani",
      "firstName" : "",
      "lastName"  : "",
      "password"  : "sani",
      "email"     : "sani@me.ch",
      "userType"  : "Normal"
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
      "rating"              : 5,
      "userName"            : "goodguy27"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7bd7"),
      "date"                : date,
      "comment"             : "very kind",
      "rating"              : 4,
      "userName"            : "goodguy27"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7bd8"),
      "date"                : date,
      "comment"             : "awful work",
      "rating"              : 1,
      "userName"            : "tizio42"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7bd9"),
      "date"                : date,
      "comment"             : "nice and helpful",
      "rating"              : 5,
      "userName"            : "tizio42"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7be1"),
      "date"                : date,
      "comment"             : "not really good",
      "rating"              : 2,
      "userName"            : "tizio42"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7be2"),
      "date"                : date,
      "comment"             : "cheap salary",
      "rating"              : 3,
      "userName"            : "tizio42"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7be3"),
      "date"                : date,
      "comment"             : "perfect job",
      "rating"              : 5,
      "userName"            : "asdrubaldo23"
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
      "events"        : [events.data[1], events.data[2]],
      "verification"  : "none",

    },
    {
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bd6"),
      "firstName"     : "Alexander",
      "lastName"      : "Fischer",
      "address"       : "Via Morobbi 13, 6592 Sant'Antonino",
      "description"   : "I'm the best scrum Master in Lugano.",
      "profession"    : "Software Engineer",
      // "category"      : { type: String, enum:['Tecnical Services', 'IT Services', 'Design', 'Management', 'Retail', 'Human Resources', 'Marketing', 'Consulting', 'Advertising', 'Logistics', 'Real Estate', 'Social Work', 'Healthcare'], default:'Other' },
      "category"      : "IT Services",
      "rating"        : 5,
      "email"         : "alexander.scrummaster@hotmail.ru",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 50,
      "reviews"       : [reviews.data[4]],
      "events"        : [events.data[0], events.data[3]],
      "verification"  : "pending",
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
      "reviews"       : [reviews.data[3], reviews.data[5]],
      "verification"  : "pending",
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
      "verification"  : "pending",
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
      "verification"  : "none",
    },
    {
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bf1"),
      "firstName"     : "Gianmarco",
      "lastName"      : "Palazzi",
      "address"       : "Piazza Duomo, 22100 Como",
      "description"   : "I'm your man",
      "profession"    : "Web developer",
      // "category"      : { type: String, enum:['Tecnical Services', 'IT Services', 'Design', 'Management', 'Retail', 'Human Resources', 'Marketing', 'Consulting', 'Advertising', 'Logistics', 'Real Estate', 'Social Work', 'Healthcare'], default:'Other' },
      "category"      : "IT Services",
      "rating"        : 5,
      "email"         : "real.giamma@hotmail.it",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 100,
      "reviews"       : [reviews.data[3]],
      "verification"  : "none",
    },

    {
      "_id"           : ObjectId("5625fc2bd66b84d23d8c7bf1"),
      "firstName"     : "Samuele",
      "lastName"      : "Bischof",
      "address"       : "Via Dogana, 41, 6854 Stabio",
      "description"   : "I'll find your bugs",
      "profession"    : "Beta tester",
      // "category"      : { type: String, enum:['Tecnical Services', 'IT Services', 'Design', 'Management', 'Retail', 'Human Resources', 'Marketing', 'Consulting', 'Advertising', 'Logistics', 'Real Estate', 'Social Work', 'Healthcare'], default:'Other' },
      "category"      : "IT Services",
      "rating"        : 5,
      "email"         : "samuele.bischof@sunrise.ch",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 40,
      "reviews"       : [reviews.data[5]],
      "verification"  : "pending",
    },

  ]
}

var seedData = [];
seedData.push(freelancers);
seedData.push(users);
seedData.push(reviews);
seedData.push(events);

module.exports = seedData;
