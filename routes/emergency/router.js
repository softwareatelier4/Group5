'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Freelancer = mongoose.model('Freelancer');
const User = mongoose.model('User');
const Notification = mongoose.model('Notification');
const config = require('../../config');

const fieldsFilter = { '__v': 0 };

router.all('/', middleware.supportedMethods('POST'));

router.post('/', function(req, res, next) {

  res.status(201);

  var newJson = {};
  newJson['profession'] = new RegExp(req.body.profession, 'i');
  newJson['category'] = new RegExp(req.body.category, 'i');
  newJson['emergencyAvailable'] = true;

  // To Be Used for Emergency List
  // Freelancer.find(newJson).exec(function(err, profiles) {
  //   if (err) return console.error(err);
  //   res.json(profiles);
  // });

  Freelancer.find(newJson).exec(function(err, profiles) {
    if (err) return console.error(err);

    // TODO: user req location to check against profiles
    var googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyAolcHbiX1slqHH0Vv3F_YC2fI_0JGFGfQ'
    });

    var distanceQuery = {
      origins : "Lugano, Switzerland",
      destinations : "Sorrento, Italy"
    }

    googleMapsClient.distanceMatrix(distanceQuery, function(err, res) {
      if (err) return console.error(err);

      console.log(res.json.rows[0].elements[0].distance.text);
      // for(var i in res.json.rows){
      //   console.log(i);
      //   console.log();
      // }

    })

    //TODO: - save notification
    var newNotification = {};
    newNotification['description'] = req.body.description;
    newNotification['profession'] = req.body.profession;
    newNotification['category'] = req.body.category;

    newNotification['userCalling'] = new User(req.session.user);

    //TODO: - send notification mail
  });


});

module.exports = router;
