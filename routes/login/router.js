'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = mongoose.model('User');
const config = require('../../config');
const serverErrors = require('../serverErrors')

const fieldsFilter = { '__v': 0 };

router.all('/', middleware.supportedMethods('GET, POST'));

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
            email: user.email,
            _id: user._id,
            pending: user.pending,
          }
        })
    }else{
      res.status(404);
      return res.status(404).json(serverErrors.notFound);
    }
  })
})

router.post('/', function(req, res, next) {
  User.findOne({userName: req.body.userName}, function(err, user){
    if(user){
      if(req.body.password == user.password){
        req.session.user = user;
        return res.status(200).json({
          statusCode: 200,
          message: "OK",
          user: {
            userName: user.userName,
            userType: user.userType,
            email: user.email,
            _id: user._id,
            pending: user.pending,
          }
        })
      }else{
        return res.status(401).json(serverErrors.unauthorized);
      }
    }else{
      return res.status(404).json(serverErrors.notFound);
    }
  })
})

router.post('/signup', function(req, res, next){
  const newUser = new User(req.body);
  User.findOne({userName: newUser.userName}, function(err, user){
    if(user){
      return res.status(400).json(serverErrors.badRequest);
    }else{
      req.session.user = newUser;
      newUser.save(function(err){
        if(err) return next(err);
        res.status(201).json(newUser);
      });

    }
  })
});

module.exports = router;
