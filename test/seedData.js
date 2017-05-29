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
      "comment"             : "Nice guy and great work!",
      "rating"              : 5,
      "userName"            : "goodguy27"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7bd7"),
      "date"                : date,
      "comment"             : "very kind",
      "rating"              : 4,
      "userName"            : "SpongebobIsCool"
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
      "comment"             : "nice work and helpful",
      "rating"              : 5,
      "userName"            : "tizio42"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7be1"),
      "date"                : date,
      "comment"             : "not really good",
      "rating"              : 2,
      "userName"            : "hero123"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7be2"),
      "date"                : date,
      "comment"             : "cheap salary but solid work",
      "rating"              : 3,
      "userName"            : "babaman21"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7be3"),
      "date"                : date,
      "comment"             : "eehm, why does my web page about cats plays songs?",
      "rating"              : 5,
      "userName"            : "asdrubaldo23"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7be4"),
      "date"                : date,
      "comment"             : "I gave you my server to test, and you told me everything was okay. It crashed mid-presentation! Never contacting you again",
      "rating"              : 1,
      "userName"            : "fischer"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7be5"),
      "date"                : date,
      "comment"             : "This guy knows how to paint! Great work my boy!",
      "rating"              : 5,
      "userName"            : "leeroyJenkins"
    },
    {
      "_id"                 : ObjectId("6625fc2bd82b84d23d8c7be6"),
      "date"                : date,
      "comment"             : "I asked him to do a Bob Marley memorial page, and he gave me some weird Atelier Beats stuff...",
      "rating"              : 2,
      "userName"            : "reggaeman18"
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
      "description"         : "Picasso is my middle name!",
      "rating"              : 3,
      "email"               : "mario.painting@bubu.ch",
      "phone_number"        : "+41 4442323223",
      "image"               : "/src/images/mario_rossi.jpg",
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
      "lastName"      : "Fisher",
      "address"       : "Via Morobbi 13, 6592 Sant'Antonino",
      "description"   : "I'm the best scrum Master in Lugano.",
      "profession"    : "Software Engineer",
      "category"      : "IT Services",
      "rating"        : 5,
      "email"         : "alexander.scrummaster@hotmail.ru",
      "phone_number"  : "+41 79 524 34 54",
      "image"         : "/src/images/fischer.png",
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
      "description"   : "Doing painting jobs all around Lugano. Call me!",
      "profession"    : "Painter",
      "category"      : "Tecnical Services",
      "image"         : "/src/images/marco_rezzonico.jpg",
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
      "image"         : "/src/images/giovanni_rezzonico.jpeg",
      "phone_number"  : "+41 78 234 18 18",
      "price"         : 202,
      "reviews"       : [],
      "emergencyAvailable"  : true,
      "verification"  : "verified",
      "events"        : [events.data[4]],
      "userId"        : "5625fc2bd82b84d23d8c9b70"
      // "notifications" : [ObjectId(notifications.data[0]._id)]
    },

    {
      //"_id"           : ObjectId("5625fc2bd82b84d23d8c7bd7"),
      "firstName"     : "Carlos",
      "lastName"      : "Santana",
      "address"       : "Zurich",
      "description"   : "I always liked to paint stuff when I was little.",
      "profession"    : "Painter",
      "category"      : "Other",
      "rating"        : 4,
      "email"         : "malnac@usi.ch",
      "image"         : "/src/images/carlos_santana.jpg",
      "phone_number"  : "+41 78 234 37 56",
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
      "image"         : "/src/images/spolel.jpg",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 60,
      "reviews"       : [reviews.data[0]._id],
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
      "phone_number"  : "+41 79 524 95 78",
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
      "description"   : "For breakfast I usually eat bread, butter and node.js",
      "image"         : "/src/images/atelier.png",
      "profession"    : "Web developer",
      "category"      : "IT Services",
      "rating"        : 5,
      "email"         : "real.giamma@usi.ch",
      "phone_number"  : "+41 79 782 56 55",
      "price"         : 100,
      "reviews"       : [reviews.data[6]._id, reviews.data[9]._id],
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
      "rating"        : 3,
      "email"         : "samuele.bischof@sunrise.ch",
      "image"         : "/src/images/sammy_cucciolo.jpg",
      "phone_number"  : "+41 79 672 56 90",
      "price"         : 40,
      "reviews"       : [reviews.data[5]._id,reviews.data[7]._id],
      "verification"  : "pending",
      "emergencyAvailable"  : false,
    },
    // {
    //   "_id"           : ObjectId("5625fc2cd82b84d23d8c7bd6"),
    //   "firstName"     : "Alexander",
    //   "lastName"      : "Fischer",
    //   "address"       : "Via Morobbi 13, 6592 Sant'Antonino",
    //   "description"   : "I'm the best scrum Master in Lugano.",
    //   "profession"    : "Software Engineer",
    //   "category"      : "IT Services",
    //   "rating"        : 5,
    //   "email"         : "alexander.scrummaster@hotmail.ru",
    //   "phone_number"  : "+41 79 524 34 54",
    //   "price"         : 50,
    //   "emergencyAvailable"  : true,
    //   "reviews"       : [reviews.data[4]],
    //   "events"        : [events.data[0], events.data[3]],
    //   "verification"  : "verified",
    //   "notifications" : [ObjectId(notifications.data[0]._id)]
    // },

    // {
    //   "_id"                 : ObjectId("5625fc9bd82b84d23d8c7bd5"),
    //   "firstName"           : "Mario",
    //   "lastName"            : "Rossi",
    //   "address"             : "Via San Gottardo 12, 6900 Lugano",
    //   "rating"              : 3,
    //   "email"               : "alexander.fischer@usi.ch",
    //   "phone_number"        : "+41 4442323223",
    //   "price"               : 100,
    //   "profession"          : "Painter",
    //   "reviews"             : [reviews.data[2]],
    //   "emergencyAvailable"  : true,
    //   "events"              : [events.data[1], events.data[2], events.data[4]],
    //   "verification"        : "verified",
    // },
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
      "image"         : "/src/images/jack.jpg",
      "phone_number"  : "+41 79 524 34 54",
      "price"         : 50,
      "emergencyAvailable"  : true,
      "reviews"       : [reviews.data[4]._id],
      "events"        : [events.data[0], events.data[3], events.data[4]],
      "verification"  : "verified",
      "notifications" : [ObjectId(notifications.data[0]._id)],
      "claimingUserId": "7625fc2bd89b84023d8c7bd6",

    },

    {
      "_id"           : ObjectId("2725fc2bd82b84d23d8c7bd7"),
      "firstName"     : "Dmytro",
      "lastName"      : "Kabyshev",
      "address"       : "krakow, Poland",
      "description"   : "Experienced iOS and server-less mobile back-end developer (Swift, Objective-C; Node.js, AWS (Cognito, Lambda, DynamoDB, SNS)).\nI work hard to understand the business needs and assist in picking the right tool for the job, so I can ensure a strategy that furthers your business goals and is technically feasible.",
      "profession"    : "Expert Mobile Developer (iOS/AWS/Node.js)",
      "category"      : "IT Services",
      "rating"        : 5,
      "email"         : "dmytro.kabyshev@usi.ch",
      "image"         : "/src/images/shughi.jpg",
      "phone_number"  : "+41 79 524 34 00",
      "price"         : 60,
      "emergencyAvailable"  : false,
      "reviews"       : [],
      "events"        : [],
      "verification"  : "verified",
      "notifications" : [],
      "claimingUserId": "7625fc2bd89b84023d8c7bd7",
    },

    {
      "_id"           : ObjectId("2725fc2bd82b84d23d8c7bd8"),
      "firstName"     : "Chase",
      "lastName"      : "Hadr",
      "address"       : "cedar park, United States",
      "description"   : "I am a writer with experience in areas including, but not limited to, sports, legal, transcription and miscellaneous web content.  I hold a B.A. in Rhetoric and Writing and have been freelance writing since 2009. I am available for both short-term and long-term projects.  My goal is to create a relationship with each client by providing outstanding work and not being satisfied until the client is satisfied.",
      "profession"    : "Writer and Editor",
      "category"      : "Other",
      "rating"        : 5,
      "email"         : "chase.hadr@usi.ch",
      "image"         : "/src/images/thomas.jpg",
      "phone_number"  : "+41 71 524 34 54",
      "price"         : 20,
      "emergencyAvailable"  : false,
      "reviews"       : [],
      "events"        : [],
      "verification"  : "verified",
      "notifications" : [],
      "claimingUserId": "7625fc2bd89b84023d8c7bd8",
    },

    {
      "_id"           : ObjectId("2725fc2bd82b84d23d8c7bd9"),
      "firstName"     : "Fernando",
      "lastName"      : "Alonso",
      "address"       : "London",
      "description"   : "Upwork Freelancer plus the CEO of a successful E-Commerce store in London which did more than $1million revenue within an year of launching and still going strong. My core skills include HTML, CSS, Javascript, PHP, MySQL, WordPress, Shopify, BigCommerce, cPanel/WHM, JIRA/Confluence Administration plus anything related to web developement and server configuration. I will be available every weekday 3:30PM GMT to 5:30PM GMT and you can contact me by e-mail.",
      "profession"    : "CEO",
      "category"      : "Other",
      "rating"        : 5,
      "email"         : "fernando.mclaren@usi.ch",
      "image"         : "/src/images/jack.jpg",
      "phone_number"  : "+41 71 524 34 54",
      "price"         : 20000,
      "emergencyAvailable"  : false,
      "reviews"       : [],
      "events"        : [],
      "verification"  : "verified",
      "notifications" : [],
      "claimingUserId": "7625fc2bd89b84023d8c7bd9",
    },

    {
      "_id"           : ObjectId("2725fc2bd82b84d23d8c7b19"),
      "firstName"     : "Costanza",
      "lastName"      : "Volpini",
      "address"       : "London",
      "description"   : "Born in Modena. Currently living in London. I begin studying as beautician but soon changes to make-up, attending BCM in Milan. I started working as make-up assistant before finishing it, at cinema festival and tv shows, but I quickly understand that I like more working with street and modern styles. I have worked with Marie Claire, Io Donna, The Greatest Magazine, Interview Russia.",
      "profession"    : "Make-up artist",
      "category"      : "Other",
      "rating"        : 3,
      "email"         : "costanza.volpini@usi.ch",
      "image"         : "/src/images/jack.jpg",
      "phone_number"  : "+41 74 524 34 54",
      "price"         : 30,
      "emergencyAvailable"  : false,
      "reviews"       : [],
      "events"        : [],
      "verification"  : "verified",
      "notifications" : [],
      "claimingUserId": "7625fc2bd89b84023d8c7b19",
    },

    {
      "_id"           : ObjectId("2725fc2bd82b84d23d8c7b11"),
      "firstName"     : "Emanuele",
      "lastName"      : "Esposito",
      "address"       : "Piazza Rezzonico, Lugano",
      "description"   : "Best pizza in Lugano, from Sorrento with Love",
      "profession"    : "Pizza artist",
      "category"      : "Other",
      "rating"        : 5,
      "email"         : "pizza.sorrento@usi.ch",
      "image"         : "/src/images/jack.jpg",
      "phone_number"  : "+41 74 666 34 54",
      "price"         : 2,
      "emergencyAvailable"  : false,
      "reviews"       : [],
      "events"        : [],
      "verification"  : "verified",
      "notifications" : [],
      "claimingUserId": "7625fc2bd89b84023d8c7b11",
    }

  ]
}


var seedData = [];
seedData.push(freelancers);
seedData.push(users);
seedData.push(reviews);
seedData.push(events);
seedData.push(notifications);

module.exports = seedData;
