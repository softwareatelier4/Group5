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

router.all('/', middleware.supportedMethods('GET'));

router.get('/:freelancerid', function(req, res, next) {
  Freelancer.findById(req.params.freelancerid, fieldsFilter).lean().exec(function(err, freelancer){
    if (err) return next (err);
    if (!freelancer) {
      res.status(404);
      console.log("NOT FOUND");
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    // addLinks(freelancer);
    res.json(freelancer);
    // res.sendFile('src/ja-freelancer-profile/ja-profile.html', { root: 'frontend/' });
  });
});

router.post('/:freelancerid/review', function(req, res, next) {
  var toAdd = new Review(req.body);
  toAdd.save(onModelSave(res, 201, false));
  Freelancer.findByIdAndUpdate(req.params.freelancerid, {$push: {"Reviews": toAdd}},
  {safe: true, upsert: true, new : true}, function(err, freelancer){
    if (err) return next (err);
    if (!freelancer) {
      return res.json({
        statusCode: 400,
        message: "Bad Request"
      });
    }});
    return res.status(201).send();
  });





function onModelSave(res, status, sendItAsResponse){
  var statusCode = status || 204;
  var sendItAsResponse = sendItAsResponse || false;
  return function(err, saved){
    if (err) {
      if (err.name === 'ValidationError'
      || err.name === 'TypeError' ) {
        res.status(400)
        return res.json({
          statusCode: 400,
          message: "Bad Request"
        });
      }else{
        return next (err);
      }
    }
    if( sendItAsResponse){
      var obj = saved.toObject();
      delete obj.password;
      delete obj.__v;
      addLinks(obj);
      return res.status(statusCode).json(obj);
    }else{
      return res.status(statusCode).end();
    }
  }
}


function addLinks(freelancer){
  freelancer.links = [
    {
      "rel" : "self",
      "href" : config.url + "/freelancer/" + freelancer._id
    }
  ];
}

module.exports = router;
