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
const mail = require('../../mail/mail');

const fieldsFilter = { '__v': 0 };

router.all('/', middleware.supportedMethods('POST'));

router.post('/', function(req, res, next) {

  res.status(201);

  let time = req.body.time;
  let alreadyExistingNotification = false;

  var freelancerQuery = {
    profession: new RegExp(req.body.profession, 'i'),
    category: new RegExp(req.body.category, 'i'),
    emergencyAvailable: true,
  };

  if (alreadyExistingNotification) {

    Notification.findById(req.body.notificationId, function(err, notificationExisting) {
      if (err) return console.error(err);

      var updateToBeMade = { freelancerNotified: notificationExisting.freelancerNotified + 1 };

      if (notificationExisting.freelancerNotified < notificationExisting.availableFreelancers.length) {
        Notification.findByIdAndUpdate(req.body.notificationId, updateToBeMade, function(err, notificationToUpdate) {
          if (err) return console.error(err);
        });

        var freelancerToBeContacted = notificationExisting.availableFreelancers[notificationExisting + 1];


        var jobAdvisorLink = 'http://localhost:3005';

        var mailContent = '<i>Hello ' + freelancerToBeContacted.firstName + ' ' + freelancerToBeContacted.lastName + ', you received an emergency call! <br> Click the following link to reply: <br>' + jobAdvisorLink + '/notification/' + freelancerToBeContacted._id +'  </i>';

        // mail.sendMailTo(profiles[0].address, mailContent, 'You Got A New Notification')
        mail.sendMailTo('sanif@usi.ch', mailContent, 'You Got A New Notification')
      } else {
        console.log("No other freelancer are available")
      }
    });

  } else {
    //notification does not exist yet, search all freelancers
    Freelancer.find(freelancerQuery).exec(function(err, profiles) {
      if (err) return console.error(err);
      // profiles is array of objects {}
      if (profiles === undefined || profiles.length == 0) {
        console.log("No matching profiles were found");
      } else {
        console.log("found " + profiles.length + " freelancers!");

        var dest = [];

        //check freelancer is available
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

        //add addressses of freelancer in dest
        profiles.forEach(function(profile) {
          dest.push(profile.address);
        })

        var dest_joined = dest.join('|')

        var googleMapsClient = require('@google/maps').createClient({
          key: 'AIzaSyAolcHbiX1slqHH0Vv3F_YC2fI_0JGFGfQ'
        });


        var distanceQuery = {
          origins : req.body.location,
          destinations : dest_joined,
        }

        if (distanceQuery.destinations !== '') {
          //search the distance using google maps
          googleMapsClient.distanceMatrix(distanceQuery, function(err, res) {
          if (err) return console.error(err);
          for(var i = 0; i < profiles.length; i++){

            profiles[i] = profiles[i].toObject();
            profiles[i].distance = res.json.rows[0].elements[i].distance.value;
          }

          //sort profiles by distance
          profiles.sort(function(a,b){
            return a.distance > b.distance;
          })

          var jobAdvisorLink = 'http://localhost:3005';

          //send mail to the first freelancer
          var mailContent = '<i>Hello ' + profiles[0].firstName + ' ' + profiles[0].lastName + ', you received an emergency call! <br> Click the following link to reply: <br>' + jobAdvisorLink + '/notification/' + profiles[0]._id +'  </i>';

          mail.sendMailTo(profiles[0].address, mailContent, 'You Got A New Notification')

          //create new notification
          var newNotification = {
            description: req.body.description,
            profession: req.body.profession,
            category: req.body.category,
            location: req.body.location,
            userCalling: req.session.user,
            freelancerNotified: 0,
            availableFreelancers: profiles
          };

          newNotification.save(function() {
            // add notification to freelancer
            Freelancer.findByIdAndUpdate(profiles[0]._id, {$push: {"notifications": newNotification}},
            {safe: true, upsert: true, new : false},
            function(err, freelancer) {
              if (err) return next (err);
              if (!freelancer) {
                console.log("freelancer not found");
              } else {
                console.log("freelancer found");
              }
            })

            //add notification to user
            User.findByIdAndUpdate(req.session.user._id, {$push: {"notifications": newNotification}},
            {safe: true, upsert: true, new : false},
            function(err, user) {
              if (err) return next (err);
              if (!user) {
                console.log("user not found");
              } else {
                console.log("user found");
              }
            })
          });

          // bellissimo timeout, professionale
          setTimeout(function(){
            if(Date.now() > new Date(newNotification.dateCreated.getTime() + time * 60000)) {

            }
          }, time);

        });
      } else {
        console.log("No matching profiles were found");
      }

      }
    });
  }


});

module.exports = router;
