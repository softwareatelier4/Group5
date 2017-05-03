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

  let time = req.body.time; //TODO

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
    // profiles is array of objects {}
    if (profiles === undefined || profiles.length == 0) {
      console.log("No matching profiles were found");
    } else {
      console.log("found " + profiles.length + " freelancers!");

      var dest = [];

      profiles.forEach(function(profile) {
        var rightone = false;
        for(let j = 0; j < profile.events.length; j++){
          var d = Date.now();
          if(profile.events[j].start <= d && d <= profile.events[j].end){
            rightone = true;
            dest.push(profile.events[j].location);
            break;
          }
        }

        if(rightone === false){
          profiles.splice(profiles.indexOf(profile), 1);
        }

      });

      var dest_joined = dest.join('|')

      var googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyAolcHbiX1slqHH0Vv3F_YC2fI_0JGFGfQ'
      });


      var distanceQuery = {
        origins : req.body.location,
        destinations : dest_joined,
      }

      // distances is an array of values
      var distances = [];
      googleMapsClient.distanceMatrix(distanceQuery, function(err, res) {
        if (err) return console.error(err);
        for(var i = 0; i < profiles.length; i++){

          profiles[i] = profiles[i].toObject();
          profiles[i].distance = res.json.rows[0].elements[i].distance.value;
        }

        profiles.sort(function(a,b){
          return a.distance > b.distance;
        })

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
