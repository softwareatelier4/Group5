/** @module users/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware =  require('../middleware');
var rootUrl = require("../../config").url;


//supported methods
router.all('/', middleware.supportedMethods('GET, OPTIONS'));

//list users
router.get('/', function(req, res, next) {
  var links = []
  if(req.accepts('text/html')){
    res.render('index', {title:"Totally Not AtelierBeats API Server", links:links});
  }else{
    res.json(links)
  }

});
/** router for /users */
module.exports = router;
