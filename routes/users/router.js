/** @module users/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware =  require('../middleware');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var User = mongoose.model('User');
var config = require("../../config");

//fields we don't want to show to the client
var fieldsFilter = { 'password': 0, '__v': 0 };

//supported methods
router.all('/:userid/playlists', middleware.supportedMethods('GET, PUT, OPTIONS'));
router.all('/:userid', middleware.supportedMethods('GET, PUT, DELETE, OPTIONS'));
router.all('/', middleware.supportedMethods('GET, POST, OPTIONS'));

//list users
router.get('/', function(req, res, next) {

  User.find({}, fieldsFilter).lean().exec(function(err, users){
    if (err) return next (err);
    users.forEach(function(user){
      addLinks(user);
    });
    res.json(users);
  });
});

//create new user
router.post('/', function(req, res, next) {

    var newUser = new User(req.body);
    newUser.save(onModelSave(res, 201, true));
});

//get a user
router.get('/:userid', function(req, res, next) {
  User.findById(req.params.userid, fieldsFilter).lean().exec(function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    addLinks(user);
    res.json(user);
  });
});

//update a user
router.put('/:userid', function(req, res, next) {
  var data = req.body;

  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (user){
      user.userName = data.userName;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.email = data.email;
      user.playlists = data.playlists;

      user.save(onModelSave(res));
    }else{
      //user does not exist create it
      var newUser = new User(data);
      newUser._id = ObjectId(req.params.userid);
      newUser.save(onModelSave(res, 201, true));
    }
  });
});

//remove a user
router.delete('/:userid', function(req, res, next) {
  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    user.remove(function(err, removed){
      if (err) return next (err);
      res.status(204).end();
    })
  });
});

//get a user's playlists
router.get('/:userid/playlists', function(req, res, next) {
  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    res.json(user.playlists);
  });
});

//update a user's playlists
router.put('/:userid/playlists', function(req, res, next) {
  var data = req.body;

  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    user.playlists = req.body;
    user.save(onModelSave(res));
  });
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
      res.status(statusCode)
      return res.json(obj);
    }else{
      return res.status(statusCode).end();
    }
  }
}

function addLinks(user){
  user.links = [
    { 
      "rel" : "self",
      "href" : config.url + "/users/" + user._id
    },
    { 
      "rel" : "playlists",
      "href" : config.url + "/users/" + user._id + "/playlists"
    }
  ];
}

/** router for /users */
module.exports = router;
