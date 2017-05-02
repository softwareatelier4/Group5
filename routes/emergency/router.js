'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Freelancer = mongoose.model('Freelancer');
const config = require('../../config');

const fieldsFilter = { '__v': 0 };

router.all('/', middleware.supportedMethods('POST'));

router.post('/', function(req, res, next) {
  // console.log("AAAAAAAAAAAAA request got");
  res.status(200);

  // var newJson = {};
  // newJson["profession"] = new RegExp(req.query.profession, 'i');
  // newJson["category"] = new RegExp(req.query.category, 'i');
  // newJson["emergencyAvailable"] = true;
  //
  // Freelancer.find(newJson).exec(function(err, profiles) {
  //   if (err) return console.error(err);
  //   res.json(profiles);
  // });

  //TODO: - save notification
  //TODO: - send notification mail

});

module.exports = router;
