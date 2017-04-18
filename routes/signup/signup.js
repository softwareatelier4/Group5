'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Freelancer = mongoose.model('User');
const config = require('../../config');

const fieldsFilter = { '__v': 0 };

router.all('/', middleware.supportedMethods('GET', 'POST'));

router.post('/', function(req, res, next) {
  var newUser = new User(req.body);
  User.findOne({userName: newUser.userName}, function(err, user){
    if(user){
      return res.json({
        statusCode: 400,
        message: "Bad Request"
      });
    }else{
      newUser.save(onModelSave(res, 201, false));
    }
  })
}

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
      return res.status(statusCode).json(obj);
    }else{
      return res.status(statusCode).end();
    }
  }
}

module.exports = router;
