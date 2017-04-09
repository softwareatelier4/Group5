/** @module users/router */
'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const rootUrl = require("../../config").url;


//supported methods
router.all('/', middleware.supportedMethods('GET, OPTIONS'));

//list users
router.get('/', function(req, res, next) {
  res.sendFile('admin.html', { root: 'frontend/' });
});
/** router for /users */
module.exports = router;
