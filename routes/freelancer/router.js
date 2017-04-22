'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Freelancer = mongoose.model('Freelancer');
const Review = mongoose.model('Review');
const config = require('../../config');

const fieldsFilter = { '__v': 0 };

router.all('/', middleware.supportedMethods('GET', 'POST'));

router.get('/:freelancerid', function(req, res, next) {
  Freelancer.findById(req.params.freelancerid, fieldsFilter).lean().exec(function(err, freelancer){
    if (err) return next (err);
    if (!freelancer) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    res.json(freelancer);
  });
});

router.post('/:freelancerid/review', function(req, res, next) {
  var toAdd = new Review(req.body);
  toAdd.save(function(err) {
    if (err) return next (err);
    Freelancer.findByIdAndUpdate(req.params.freelancerid, {$push: {"reviews": toAdd}},
    {safe: true, upsert: true, new : true}, function(err, freelancer){
      if (err) return next (err);
      if (!freelancer) {
        res.status(400);
        return res.json({
          statusCode: 400,
          message: "Bad Request"
        });
      }else{
        res.status(200);
        return;
      }
    });
      return;
  });

  });

module.exports = router;
