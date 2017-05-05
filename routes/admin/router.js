/** @module users/router */
'use strict';

const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const rootUrl = require('../../config').url;
const mail = require('../../mail/mail');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Freelancer = mongoose.model('Freelancer');
const User = mongoose.model('User');
const config = require('../../config');



//supported methods
router.all('/', middleware.supportedMethods('GET, POST, PUT, OPTIONS'));


router.get('/', function (req, res, next) {
    res.status(200);

  Freelancer.find({
    "verification": 'pending'
  }).exec(function (err, profiles) {
    if (err) return console.error(err);
    res.json(profiles);
  });
});

router.put('/', function (req, res) {
  if(req.query.type == 'verified'){
    //accept
  Freelancer.findOneAndUpdate({_id: req.query.id}, { $set:{verification: req.query.type, userId: req.query.claimingUserId}}, { new: true }, function(err, profile) {
      User.findByIdAndUpdate(new ObjectId(req.query.claimingUserId), { freelancerId: profile._id.toString()}).exec(function(err, user) {
        if (err) return console.error(err);
        res.json(profile);
      });
    });

  }else{
    //deny
    // console.log(req.query.claimingUserId);
    User.findOneAndUpdate({
      _id: req.query.claimingUserId
    }, {
      $set: {
        pending: "none",
      }
    }).exec(function (err, profiles) {
      if (err) console.error(err);
    });

    Freelancer.findOneAndUpdate({_id: req.query.id}, { $set:{verification: req.query.type}}, { new: true }, function(err, profile) {
      if (err) return console.error(err);
      res.json(profile);
    });
  }

});

router.post('/', function (req, res) {
  mail.sendMailTo(req.query.address, req.query.content, req.query.subject)
});


/** router for /users */
module.exports = router;
