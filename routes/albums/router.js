/** @module albums/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware =  require('../middleware');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Album = mongoose.model('Album');
var config = require("../../config");

//fields we don't want to show to the client
var fieldsFilter = { '__v': 0 };

//supported methods
router.all('/:albumid', middleware.supportedMethods('GET, PUT, DELETE, OPTIONS'));
router.all('/', middleware.supportedMethods('GET, POST, OPTIONS'));

//list albums
router.get('/', function(req, res, next) {

  Album.find({}, fieldsFilter).lean().exec(function(err, albums){
    if (err) return next (err);
    albums.forEach(function(album){
      addLinks(album);
    });
    res.json(albums);
  });
});

//create new album
router.post('/', function(req, res, next) {
    var newAlbum = new Album(req.body);
    newAlbum.save(onModelSave(res, 201, true));
});

//get a album
router.get('/:albumid', function(req, res, next) {
  Album.findById(req.params.albumid, fieldsFilter).lean().exec(function(err, album){
    if (err) return next (err);
    if (!album) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    addLinks(album);
    res.json(album);
  });
});

//update a album
router.put('/:albumid', function(req, res, next) {
  var data = req.body;

  Album.findById(req.params.albumid, fieldsFilter , function(err, album){
    if (err) return next (err);
    if (album){
      album.name =  data.name; 
      album.artist = data.artist;
      album.artwork = data.artwork;
      album.dateCreated = data.dateCreated;

      album.save(onModelSave(res));
    }else{
      //album does not exist create it
      var newAlbum = new Album(data);
      newAlbum._id = ObjectId(req.params.albumid);
      newAlbum.save(onModelSave(res, 201, true));
    }
  });
});

//remove a album
router.delete('/:albumid', function(req, res, next) {
  Album.findById(req.params.albumid, fieldsFilter , function(err, album){
    if (err) return next (err);
    if (!album) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    album.remove(function(err, removed){
      if (err) return next (err);
      res.status(204).end();
    })
  });
});

//edit an album through a form
router.get('/:albumid/edit', function(req, res, next) {
  Album.findById(req.params.albumid, fieldsFilter , function(err, album){
    if (err) return next (err);
    if (!album) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    
    var albumToReturn = [];
    albumToReturn.push({field_name: "name", field_value: album.name});
    albumToReturn.push({field_name: "artist", field_value: album.artist});
    albumToReturn.push({field_name: "artwork", field_value: album.artwork});  
    albumToReturn.push({field_name: "dateCreated", field_value: album.dateCreated});
    
    //return the form
    res.render('update_form', {title:"AtelierBeats API Server", id: album._id, resource:"albums", fields: albumToReturn});
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
      return res.status(statusCode).json(obj);
    }else{
      return res.status(statusCode).end();
    }
  }
}

function addLinks(album){
  album.links = [
    { 
      "rel" : "self",
      "href" : config.url + "/albums/" + album._id
    },
    { 
      "rel" : "artist",
      "href" : config.url + "/artists/" + album.artist
    }
  ];
}

/** router for /albums */
module.exports = router;
