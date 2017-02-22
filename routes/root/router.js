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
  var links = [
  {
    "rel" : "albums",
    "href" : rootUrl + "/albums"
  },
  {
    "rel" : "artists",
    "href" : rootUrl + "/artists"
  },
  {
    "rel" : "playlists",
    "href" : rootUrl + "/playlists"
  },
  {
    "rel" : "tracks",
    "href" : rootUrl + "/tracks"
  },
  {
    "rel" : "users",
    "href" : rootUrl + "/users"
  }
]
  if(req.accepts('text/html')){
    res.render('index', {title:"AtelierBeats API Server", links:links});
  }else{
    res.json(links)
  }
  
});
/** router for /users */
module.exports = router;
