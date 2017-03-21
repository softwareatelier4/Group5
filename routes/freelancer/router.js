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

function addLinks(freelancer){
  freelancer.links = [
    {
      "rel" : "self",
      "href" : config.url + "/freelancer/" + freelancer._id
    }
  ];
}

module.exports = router;
