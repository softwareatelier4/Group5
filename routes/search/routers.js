'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Profile = mongoose.model('Profile');
const config = require('../../config');
const session = require('express-session');

const fieldsFilter = { '__v': 0 };

router.all('/', middleware.supportedMethods('GET'));

router.get('/', function(req, res, next) {
  res.status(200);

  Profile.find(req.query, function(err, profiles) {
    if (err) return console.error(err);
    res.json(profiles);
  });
});

module.exports = router;
