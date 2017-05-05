'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = mongoose.model('User');
const config = require('../../config');

const fieldsFilter = { '__v': 0 };

router.all('/', middleware.supportedMethods('POST'));

router.get('/:id', function(req, res, next) {
  User.findOne({_id: req.params.id}, function(err, user){
    if(user){
        res.status(200);
        return res.json({
          statusCode: 200,
          message: "OK",
          user: {
            userName: user.userName,
            userType: user.userType,
            userMail: user.email,
            userId: user._id,
            userPending: user.pending,
          }
        })
    }else{
      res.status(400);
      return res.json({
        statusCode: 400,
        message: "Bad Request"
      });
    }
  })
})

router.post('/', function(req, res, next) {
  User.findOne({userName: req.body.userName}, function(err, user){
    if(user){
      if(req.body.password == user.password){
        req.session.user = user;
        res.status(200);
        return res.json({
          statusCode: 200,
          message: "OK",
          user: {
            userName: user.userName,
            userType: user.userType,
            userMail: user.email,
            userId: user._id,
            userPending: user.pending,
          }
        })
      }else{
        res.status(400);
        return res.json({
          statusCode: 400,
          message: "Bad Request"
        });
      }
    }else{
      res.status(400);
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
      res.status(400);
      return res.json({
        statusCode: 400,
        message: "Bad Request"
      });
    }else{
      req.session.user = newUser;
      newUser.save(function(err){
        if(err) return next(err);
        res.status(201);
        res.json(newUser);
      });

    }
  })
});

module.exports = router;
