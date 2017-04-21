/** @module users/router */
'use strict';

const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const rootUrl = require('../../config').url;
const mail = require('../../mail/mail');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Freelancer = mongoose.model('Freelancer');
const config = require('../../config');



//supported methods
router.all('/', middleware.supportedMethods('GET, POST, PUT, OPTIONS'));

//list users
router.get('/', function (req, res, next) {
  res.sendFile('admin.html', {
    root: 'frontend/'
  });
});

router.get('/pending/', function (req, res, next) {
  res.status(200);

  Freelancer.find({
    "verification": 'pending'
  }).exec(function (err, profiles) {
    if (err) return console.error(err);
    res.json(profiles);
  });

});

router.put('/', function (req, res) {
  Freelancer.findOneAndUpdate({_id: req.query.id}, {$set:{verification: req.query.type}}).exec(function (err, profiles) {
    if (err) return console.error(err);
    res.json(profiles);
  });
});

router.post('/', function (req, res) {
  mail.sendMailTo(req.query.address, req.query.content, req.query.subject)
});


/** router for /users */
module.exports = router;