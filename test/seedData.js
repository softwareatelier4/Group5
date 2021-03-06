'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var date = new Date();

var notifications = {
  name : "Notification",
  data : [
    {
      "_id"                 : ObjectId("590f2bcfda0f255fd9fb5654"),
      "description"         : "I want a plumber because my sink is broken",
      "profession"          : "Plumber",
      "category"            : "Other",
      "location"            : "Via Monte Bre 16, Lugano",
      "userCalling"         :  ObjectId("5625fc2bd82b84d23d8c9bd0"),
      "freelancerNotified"  : 0,
      "availableFreelancers": [ObjectId("5625fc2bd82b84d23d8c7bd6"), ObjectId("5625fc2bd82b84d23d8c7bd0")],
      "status"              : "Pending",
      "phone"               : "000000000"
    },
    // {
    //   // "_id"                 : ObjectId("5625fc2bd66b84d23d8c7bf2"),
    //   "description"         : "I think my cat has a virus",
    //   "profession"          : "IT guy",
    //   "category"            : "Other",
    //   "userCalling"         : "5625fc2bd82b84d23d8c9bd0",
    //   "freelancerNotified"  : 0,
    //   "availableFreelancers": [freelancers.data[3]._id]
    // },
    // {
    //   // "_id"                 : ObjectId("5625fc2bd66b84d23d8c7bf2"),
    //   "description"         : "I need a painter for my toilet",
    //   "profession"          : "Painter",
    //   "category"            : "Other",
    //   "userCalling"         : "5625fc2bd82b84d23d8c9bd0",
    //   "freelancerNotified"  : 0,
    //   "availableFreelancers": [freelancers.data[2]._id],
    //   "status"              : "Refused"
    // },
  ]
}

var events = {
  name : 'CalendarEvent',
  data : [
    {
      "_id"         : ObjectId("4625fc2bd82b84d23d8c7bd6"),
      "location"    : "Lugano",
      "description" : "Riparazione tubatura sig.ra Bianchi",
      "start"       : new Date(2017, 1, 1, 10, 30),
      "end"         : new Date(2017, 1, 1, 12, 30)
    },
    {
      "_id"         : ObjectId("4625fc2bd82b84d23d8c7bd7"),
      "location"    : "Bellinzona",
      "description" : "Riparazione tetto sig.ra Bianchi",
      "start"       : new Date(2017, 1, 1, 10, 30),
      "end"         : new Date(2017, 1, 1, 12, 30)
    },
    {
      "_id"         : ObjectId("4625fc2bd82b84d23d8c7bd8"),
      "location"    : "Locarno",
      "description" : "Riparazione doccia sig.ra Bianchi",
      "start"       : new Date(2017, 1, 1, 10, 30),
      "end"         : new Date(2017, 1, 1, 12, 30)
    },
    {
      "_id"         : ObjectId("4625fc2bd82b84d23d8c7bd9"),
      "location"    : "Milano",
      "description" : "Riparazione finestra sig.ra Bianchi",
      "start"       : new Date(2017, 1, 1, 10, 30),
      "end"         : new Date(2017, 1, 1, 12, 30)
    },
    {
      "location"    : "Lugano",
      "description" : "Riparazione finestra sig.ra Bianchi",
      "start"       : date,
      "end"         : new Date(date.getTime() + 50 * 60000)
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
      "_id"       : ObjectId("5625fc2bd82b84d23d8c9bd0"),
      "userName"  : "fischer",
      "firstName" : "",
      "lastName"  : "",
      "password"  : "fischer",
      "email"     : "fischer@me.ch",
      "userType"  : "Freelancer",
      "freelancerId" : "5625fc2bd82b84d23d8c7bd6",
      "notifications" : [notifications.data[0]]
    },
    {
      "_id"       : ObjectId("5625fc2bd82b84d23d8c9b70"),
      "userName"  : "esposem",
      "firstName" : "",
      "lastName"  : "",
      "password"  : "em",
      "email"     : "fischa@usi.ch",
      "userType"  : "Freelancer",
      "freelancerId" : "5625fc2bd82b84d23d8c7bd0",
    },
    {
      "userName"  : "sani",
      "firstName" : "",
      "lastName"  : "",
      "password"  : "sani",
      "email"     : "sani@me.ch",
      "userType"  : "Normal"
    },
    {
      "_id"       : ObjectId("7625fc2bd89b84023d8c7bd6"),
      "userName"  : "jack",
      "firstName" : "",
      "lastName"  : "",
      "password"  : "jack",
      "email"     : "jack27@me.ch",
      "userType"  : "Freelancer",
      "freelancerId": "2725fc2bd82b84d23d8c7bd6"
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
      "_id"                 : ObjectId("5625fc2bd82b84d23d8c7bd5"),
      "firstName"           : "Mario",
      "lastName"            : "Rossi",
      "address"             : "Via San Gottardo 12, 6900 Lugano",
      "rating"              : 3,
      "email"               : "alexander.fischer0@usi.ch",
      "phone_number"        : "+41 4442323223",
      "price"               : 100,
      "profession"          : "Painter",
      "reviews"             : [reviews.data[2]._id],
      "emergencyAvailable"  : true,
      "events"              : [events.data[1], events.data[2], events.data[4]],
      "verification"        : "not verified",
    },
    {
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bd6"),
      "firstName"     : "Alexander",
      "lastName"      : "Fischer",
      "address"       : "Via Morobbi 13, 6592 Sant'Antonino",
      "description"   : "I'm the best scrum Master in Lugano.",
      "profession"    : "Software Engineer",
      "category"      : "IT Services",
      "rating"        : 5,
      "email"         : "alexander.scrummaster@hotmail.ru",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 50,
      "emergencyAvailable"  : false,
      "reviews"       : [reviews.data[4]._id],
      "events"        : [events.data[0], events.data[3]],
      "verification"  : "pending",
      "notifications" : [ObjectId(notifications.data[0]._id)],
      "claimingUserId": "2625fc2bd89b84023d8c7bd6",

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
      "email"         : "esposem@usi.ch",
      "phone_number"  : "+41 78 234 77 23",
      "price"         : 20,
      "reviews"       : [reviews.data[3]._id, reviews.data[5]._id],
      "emergencyAvailable"  : true,
      "verification"  : "pending",
    },

    {
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bd0"),
      "firstName"     : "Marco",
      "lastName"      : "Rezzonico",
      "address"       : "Viale stazione, Bellinzona",
      "description"   : "I'm the painter you are searching for",
      "profession"    : "Painter",
      "category"      : "Other",
      "rating"        : 4,
      "email"         : "fischa@usi.ch",
      "phone_number"  : "+41 78 234 77 23",
      "price"         : 202,
      "reviews"       : [],
      "emergencyAvailable"  : true,
      "verification"  : "verified",
      "events"        : [events.data[4]],
      // "notifications" : [ObjectId(notifications.data[0]._id)]
    },

    {
      // "_id"           : ObjectId("5625fc2bd82b84d23d8c7bd7"),
      "firstName"     : "Antonio",
      "lastName"      : "Rezzonico",
      "address"       : "Zurich",
      "description"   : "I'm the painter you are searching for",
      "profession"    : "Painter",
      "category"      : "Other",
      "rating"        : 4,
      "email"         : "malnac@usi.ch",
      "phone_number"  : "+41 78 234 77 23",
      "price"         : 200,
      "reviews"       : [],
      "emergencyAvailable"  : true,
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
      "email"         : "francesco.sani@usi.ch",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 60,
      "reviews"       : [reviews.data[5]._id],
      "emergencyAvailable"  : false,
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
      "email"         : "the.painter@usi.ch",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 100,
      "reviews"       : [reviews.data[2]._id],
      "emergencyAvailable"  : false,
      "verification"  : "not verified",
      "claimingUserId": "2625fc2bd89b84023d8c7bd6",
    },
    {
      "_id"           : ObjectId("5625fc2bd82b84d23d8c7bf1"),
      "firstName"     : "Gianmarco",
      "lastName"      : "Palazzi",
      "address"       : "Piazza Duomo, 22100 Como",
      "description"   : "I'm your man",
      "profession"    : "Web developer",
      "category"      : "IT Services",
      "rating"        : 5,
      "email"         : "real.giamma@usi.ch",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 100,
      "reviews"       : [reviews.data[3]._id],
      "emergencyAvailable"  : false,
      "verification"  : "not verified",
    },

    {
      "_id"           : ObjectId("5625fc2bd66b84d23d8c7bf2"),
      "firstName"     : "Samuele",
      "lastName"      : "Bischof",
      "address"       : "Via Dogana, 41, 6854 Stabio",
      "description"   : "I'll find your bugs",
      "profession"    : "Beta tester",
      "category"      : "IT Services",
      "rating"        : 5,
      "email"         : "samuele.bischof@sunrise.ch",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 40,
      "reviews"       : [reviews.data[5]._id],
      "verification"  : "pending",
      "emergencyAvailable"  : false,
    },
    {
      "_id"           : ObjectId("5625fc2cd82b84d23d8c7bd6"),
      "firstName"     : "Alexander",
      "lastName"      : "Fischer",
      "address"       : "Via Morobbi 13, 6592 Sant'Antonino",
      "description"   : "I'm the best scrum Master in Lugano.",
      "profession"    : "Software Engineer",
      "category"      : "IT Services",
      "rating"        : 5,
      "email"         : "alexander.scrummaster@hotmail.ru",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 50,
      "emergencyAvailable"  : true,
      "reviews"       : [reviews.data[4]],
      "events"        : [events.data[0], events.data[3]],
      "verification"  : "verified",
      "notifications" : [ObjectId(notifications.data[0]._id)]
    },

    {
      "_id"                 : ObjectId("5625fc9bd82b84d23d8c7bd5"),
      "firstName"           : "Mario",
      "lastName"            : "Rossi",
      "address"             : "Via San Gottardo 12, 6900 Lugano",
      "rating"              : 3,
      "email"               : "alexander.fischer@usi.ch",
      "phone_number"        : "+41 4442323223",
      "price"               : 100,
      "profession"          : "Painter",
      "reviews"             : [reviews.data[2]],
      "emergencyAvailable"  : true,
      "events"              : [events.data[1], events.data[2], events.data[4]],
      "verification"        : "verified",
    },
    {
      "_id"           : ObjectId("2725fc2bd82b84d23d8c7bd6"),
      "firstName"     : "Jack",
      "lastName"      : "Daniels",
      "address"       : "10 Downing St, Westminster, London SW1A 2AA, UK",
      "description"   : "I'm your last consolation",
      "profession"    : "Confort Manager",
      "category"      : "IT Services",
      "rating"        : 5,
      "email"         : "jack.daniels27@usi.ch",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 50,
      "emergencyAvailable"  : true,
      "reviews"       : [reviews.data[4]],
      "events"        : [events.data[0], events.data[3], events.data[4]],
      "verification"  : "verified",
      "notifications" : [ObjectId(notifications.data[0]._id)],
      "claimingUserId": "7625fc2bd89b84023d8c7bd6",

    },

  ]
}


var seedData = [];
seedData.push(freelancers);
seedData.push(users);
seedData.push(reviews);
seedData.push(events);
seedData.push(notifications);

module.exports = seedData;
