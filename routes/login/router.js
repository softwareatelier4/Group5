'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = mongoose.model('User');
const config = require('../../config');

const fieldsFilter = { '__v': 0 };

// router.all('/', middleware.supportedMethods('GET', 'POST'));

router.post('/', function(req, res, next) {
  console.log('password required')
  User.findOne({userName: req.body.userName}, function(err, user){
    if(user){
      if(req.body.password == user.password){
        return res.json({
          statusCode: 200,
          message: "OK",
          user: {
            userName: user.userName,
            type: user.userType
          }
        })
      }else{
        return res.json({
          statusCode: 400,
          message: "Bad Request"
        });
      }
    }else{
      return res.json({
        statusCode: 400,
        message: "Bad Request"
      });
    }
  })
})

router.post('/signup', function(req, res, next){
  const newUser = new User(req.body);
  User.findOne({userName: newUser.userName}, function(err, user){
    if(user){
      return res.json({
        statusCode: 400,
        message: "Bad Request"
      });
    }else{
      req.session.user = newUser;
      newUser.save(onModelSave(res, 201, true));
    }
  })
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
      return res.status(statusCode).json(obj);
    }else{
      return res.status(statusCode).end();
    }
  }
}

module.exports = router;
