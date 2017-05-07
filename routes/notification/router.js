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
    User.findById(req.params.id, function(err, user){
      if(user){
        user = user.toObject();
        var totalitem = user.notifications.length;
        var processed = 0;
        user.notifications.forEach(function(el){
          console.log(el);
          // el = el.toObject();
          Freelancer.findById(el.availableFreelancers[el.freelancerNotified], function(err, freelancer){
            processed++;
            el.availableFreelancers[el.freelancerNotified] = freelancer;
            if(processed === totalitem){
              res.status(200).json(user.notifications);
            }
          });
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
        freelancer.notifications.forEach(function(el){
          // el = el.toObject();
          User.findById(el.userCalling, function(err, user){
            processed++;
            el.userCalling = user;
            if(processed === totalitem){
              res.status(200).json(freelancer.notifications);
            }
          });
        })
        // console.log("AAAAAAAAA freelancer found");
        // console.log(freelancer.notifications);
        // res.status(200).json(freelancer.notifications);
      }else{
        console.log("not found");
        res.sendStatus(400);
      }
    });
  }
});

module.exports = router;
