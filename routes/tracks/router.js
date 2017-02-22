/** @module tracks/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware =  require('../middleware');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Track = mongoose.model('Track');
var config = require("../../config");

//fields we don't want to show to the client
var fieldsFilter = { '__v': 0 };

//supported methods
router.all('/:trackid', middleware.supportedMethods('GET, PUT, DELETE, OPTIONS'));
router.all('/', middleware.supportedMethods('GET, POST, OPTIONS'));

//list tracks
router.get('/', function(req, res, next) {

  Track.find({}, fieldsFilter).lean().exec(function(err, tracks){
    if (err) return next (err);
    tracks.forEach(function(track){
      addLinks(track);
    });
    res.json(tracks);
  });
});

//create new track
router.post('/', function(req, res, next) {

    var newTrack = new Track(req.body);
    newTrack.save(onModelSave(res, 201, true));
});

//get a track
router.get('/:trackid', function(req, res, next) {
  Track.findById(req.params.trackid, fieldsFilter).lean().exec(function(err, track){
    if (err) return next (err);
    if (!track) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    addLinks(track);
    res.json(track);
  });
});

//update a track
router.put('/:trackid', function(req, res, next) {
  var data = req.body;

  Track.findById(req.params.trackid, fieldsFilter , function(err, track){
    if (err) return next (err);
    if (track){
      track.name = data.name;
      track.artist = data.artist;
      track.duration = data.duration;
      track.file = data.file;
      track.album = data.album;
      track.id3Tags = data.id3Tags;
      track.dateReleased = data.dateReleased;
      track.dateCreated = data.dateCreated;


      track.save(onModelSave(res));
    }else{
      //track does not exist create it
      var newTrack = new Track(data);
      newTrack._id = ObjectId(req.params.trackid);
      newTrack.save(onModelSave(res, 201, true));
    }
  });
});

//remove a track
router.delete('/:trackid', function(req, res, next) {
  Track.findById(req.params.trackid, fieldsFilter , function(err, track){
    if (err) return next (err);
    if (!track) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    track.remove(function(err, removed){
      if (err) return next (err);
      res.status(204).end();
    })
  });
});

//edit an artist through a form
router.get('/:trackid/edit', function(req, res, next) {
  Track.findById(req.params.trackid, fieldsFilter , function(err, track){
    if (err) return next (err);
    if (!track) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    var trackToReturn = [];
    trackToReturn.push({field_name: "name", field_value: track.name});
    trackToReturn.push({field_name: "dateCreated", field_value: track.dateCreated});
    trackToReturn.push({field_name: "id3Tags", field_value: JSON.stringify(track.id3Tags).replace("]", "").replace("[", "").replace(/"/g, "")});
    trackToReturn.push({field_name: "dateReleased", field_value: track.dateReleased});
    trackToReturn.push({field_name: "file", field_value: track.file});
    trackToReturn.push({field_name: "duration", field_value: track.duration});
    trackToReturn.push({field_name: "album", field_value: track.album});
    trackToReturn.push({field_name: "artist", field_value: track.artist});
    
    //return the form
    res.render('update_form', {title:"AtelierBeats API Server", id: track._id, resource:"tracks", fields: trackToReturn});
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

function addLinks(track){
  track.links = [
    { 
      "rel" : "self",
      "href" : config.url + "/tracks/" + track._id
    },
    { 
      "rel" : "artist",
      "href" : config.url + "/artists/" + track.artist
    }
  ];

  if(track.album){
    track.links.push({ 
      "rel" : "album",
      "href" : config.url + "/albums/" + track.album
    });
  }
}

/** router for /tracks */
module.exports = router;
