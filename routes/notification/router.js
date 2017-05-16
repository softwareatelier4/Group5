'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Freelancer = mongoose.model('Freelancer');
const User = mongoose.model('User');
const Notification = mongoose.model('Notification');
const mail = require('../../mail/mail');

router.all('/', middleware.supportedMethods(' GET'));

router.get('/:id/:subject', function(req, res, next){
  if(req.params.subject === "user"){
    //return an array of notifications with each notification a freelancer
    User.findById(req.params.id, function(err, user){
      if(user){
        var totalitem = user.notifications.length;
        var processed = 0;
        var result = [];
        var notifIdQuery = [];
        user.notifications.forEach(function(notifId) {
          notifIdQuery.push({ _id: new ObjectId(notifId) })
        })
        Notification.find().or(notifIdQuery).exec(function(err, notifs){
          // if (err) console.error(err);
          if(notifs) {
            notifs.forEach(function(notification) {
              if(notification.availableFreelancers.length > 0){
                Freelancer.findById(notification.availableFreelancers[notification.freelancerNotified], function(err, freelancer) {
                  processed++;
                  notification.availableFreelancers[notification.freelancerNotified] = freelancer;
                  result.push(notification);
                  if(processed === totalitem) {
                    res.status(200).json(result);
                  }
                });
              } else {
                res.status(200).json(result);
              }
            })
          } else {
            res.status(200).json(result);
          }
        })
      }else{
        console.log("not found");
        res.sendStatus(400);
      }
    });
  }else{ // freelancer
    Freelancer.findById(req.params.id, function(err, freelancer){
      if(freelancer){
        freelancer = freelancer.toObject();
        var totalitem = freelancer.notifications.length;
        var processed = 0;
        var result = [];
        freelancer.notifications.forEach(function(notificationid){
          Notification.findById(notificationid, function(err, notif){
            User.findById(notif.userCalling, function(err, user){
              processed++;
              notif.userCalling = user;
              result.push(notif);
              if(processed === totalitem){
                res.status(200).json(result);
              }
            });
          });
        })
      }else{
        console.log("not found");
        res.sendStatus(400);
      }
    });
  }
});

module.exports = router;
