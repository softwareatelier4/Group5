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
    //retunrn an array of notification with each notification a freelancer
    User.findById(req.params.id, function(err, user){
      if(user){
        user = user.toObject();
        var totalitem = user.notifications.length;
        var processed = 0;
        var result = [];
        user.notifications.forEach(function(notificationid){
          console.log("id " + notificationid);
          Notification.findById(notificationid, function(err, notif){
            console.log("notif" + notif);
            if(notif.availableFreelancers.length > 0){
              Freelancer.findById(notif.availableFreelancers[notif.freelancerNotified], function(err, freelancer){
                processed++;
                notif.availableFreelancers[notif.freelancerNotified] = freelancer;
                result.push(notif);
                if(processed === totalitem){
                  res.status(200).json(result);
                }
              });
            }else{
              res.status(200).json(result);
            }
          })
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
