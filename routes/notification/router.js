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
        res.status(200).json(user.notifications);
      }else{
        console.log("not found");
        res.sendStatus(400);
      }
    });
  }else{ // freelancer
    Freelancer.findById(req.params.id, function(err, freelancer){
      if(freelancer){
        // console.log("freelancer found");
        // console.log(freelancer.notifications);
        res.status(200).json(freelancer.notifications);
      }else{
        console.log("not found");
        res.sendStatus(400);
      }
    });
  }
});

module.exports = router;
