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

    if (profiles === undefined || profiles.length == 0) {
      console.log("No matching profiles were found");
      //TODO: do something here
    } else {
      var dest = [];
      profiles.forEach(function(profile) {
        dest.push(profile.address);
      });
      var dest_joined = dest.join('|')

      // TODO: user req location to check against profiles
      var googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyAolcHbiX1slqHH0Vv3F_YC2fI_0JGFGfQ'
      });


      var distanceQuery = {
        origins : req.body.location,
        destinations : dest_joined,
      }

      googleMapsClient.distanceMatrix(distanceQuery, function(err, res) {
        if (err) return console.error(err);
        console.log(res.json.rows[0].elements[0].distance.text);

      });

      //TODO: - save notification
      var newNotification = {
        description: req.body.description,
        profession: req.body.profession,
        category: req.body.category,
        location: req.body.location,
        userCalling: new User(req.session.user)
      };

      //TODO: - send notification mail
    }
  });


});

module.exports = router;
