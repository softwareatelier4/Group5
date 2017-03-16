'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Freelancer = mongoose.model('Freelancer');
const config = require('../../config');

const fieldsFilter = { '__v': 0 };

router.all('/', middleware.supportedMethods('GET'));

router.get('/', function(req, res, next) {
  res.status(200);

  var searchFilter = {};
  for (var k in req.query) {
    if (req.query.hasOwnProperty(k)) {
      searchFilter[k] = new RegExp(req.query[k], "i")
    }
  }

  Freelancer.find(searchFilter, function(err, profiles) {
    if (err) return console.error(err);
    res.json(profiles);
  });
});

module.exports = router;
