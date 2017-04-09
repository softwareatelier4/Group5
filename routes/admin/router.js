/** @module users/router */
'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const rootUrl = require('../../config').url;
const mail = require('../../mail/mail');



//supported methods
router.all('/', middleware.supportedMethods('GET, POST, OPTIONS'));

//list users
router.get('/', function(req, res, next) {
  res.sendFile('admin.html', { root: 'frontend/' });
});

router.post('/', function(req, res) {
  mail.sendMailTo(req.query.address, req.query.content, req.query.subject)
});

/** router for /users */
module.exports = router;
