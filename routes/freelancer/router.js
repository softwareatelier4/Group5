'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const formidable = require('formidable');
const fs = require('fs');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Freelancer = mongoose.model('Freelancer');
const Review = mongoose.model('Review');
const CalendarEvent = mongoose.model('CalendarEvent');
const config = require('../../config');
const serverErrors = require('../serverErrors')

const fieldsFilter = { '__v': 0 };

router.all('/', middleware.supportedMethods('GET, POST, DELETE'));

router.get('/:freelancerid', function(req, res, next) {
  Freelancer.findById(req.params.freelancerid, fieldsFilter).lean().exec(function(err, freelancer){
    if (err) {
      return res.status(400).json(serverErrors.badRequest);
    }
    if (!freelancer) {
      return res.status(404).json(serverErrors.notFound);
      return;
    }
    res.json(freelancer);
  });
});

router.post('/:freelancerid/review', function(req, res, next) {
  var toAdd = new Review(req.body);
  toAdd.save(function(err) {
    if (err) {
      return res.status(400).json(serverErrors.badRequest);
    }
    Freelancer.findByIdAndUpdate(req.params.freelancerid, {$push: {"reviews": toAdd}},
    {safe: true, upsert: true, new : false},
    function(err, freelancer) {
      if (err) {
        return res.status(400).json(serverErrors.badRequest);
      }else if (!freelancer) {
        return res.status(400).json(serverErrors.badRequest);
      } else {
        return res.json(toAdd._id);
      }
    })
  });
});

router.post('/:freelancerid/event', function(req, res, next) {
  var toAdd = new CalendarEvent(req.body);
  toAdd.save(function(err) {
    if (err) {
      return res.status(400).json(serverErrors.badRequest);
    }
    Freelancer.findByIdAndUpdate(req.params.freelancerid, {$push: {"events": toAdd}},
    {safe: true, upsert: true, new : false},
    function(err, freelancer) {
      if (err) {
        return res.status(400).json(serverErrors.badRequest);
      } else if (!freelancer) {
        return res.status(404).json(serverErrors.notFound);
      } else {
        return res.json(toAdd);
      }
    })
  });
});

router.delete('/:freelancerid/event/:eventid', function(req, res, next) {
  CalendarEvent.findById(req.params.eventid, function(err, toDel){
    if(toDel){
      Freelancer.findByIdAndUpdate(req.params.freelancerid, { $pull: { events : toDel } }, function(err, freelancer){
        if(err){
          return res.status(400).json(serverErrors.badRequest);
        }else if (!freelancer) {
          return res.status(404).json(serverErrors.notFound);
        } else{
          CalendarEvent.remove(toDel,
            function(err) {
              if (err) {
                return res.status(400).json(serverErrors.badRequest);
              } else {
                return res.json({
                  _id : req.params.eventid,
                  statusCode: 200,
                  message: "OK"
                });
              }
            })
          }
        })
      }else{
        return res.status(404).json(serverErrors.notFound);
      }
    });
  });

  router.post('/:n', function(req, res, next) {
    let n = req.params.n;
    var toAdd = new Freelancer(req.body);
    if (n == 1){
      toAdd.image = "/src/images/" + toAdd._id + ".png";
    } else {
      toAdd.image = "/src/images/blank-user.jpg";
    }
    toAdd.save();
    res.json(toAdd._id);
  });


  module.exports = router;
