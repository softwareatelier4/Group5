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

  var categories = ['firstName', 'lastName', 'address', 'description', 'profession', 'reviews'];

  if(req.query.general || req.query.category) {
    var input = new RegExp(req.query.general, 'i');
    var queryArray = [];
    categories.forEach(function(property) {
      var newJson = {}
      newJson[property] = input;
      if (req.query.category) {
        newJson["category"] = new RegExp(req.query.category, 'i');
      }
      queryArray.push(newJson);
    });
    Freelancer.find().or(queryArray).exec(function(err, profiles) {
      if (err) return console.error(err);
      res.json(profiles);
    });
  }else{
  Freelancer.find().exec(function(err, profiles) {
    if (err) return console.error(err);
    res.json(profiles);
  });
}
});

module.exports = router;
