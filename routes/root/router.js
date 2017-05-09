/** @module users/router */
'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const rootUrl = require("../../config").url;


//supported methods
router.all('/', middleware.supportedMethods('GET'));

//list users
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'frontend/' });
});
/** router for /users */
module.exports = router;
