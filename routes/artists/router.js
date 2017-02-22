/** @module artists/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware =  require('../middleware');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Artist = mongoose.model('Artist');
var config = require("../../config");

//fields we don't want to show to the client
var fieldsFilter = { '__v': 0 };

//supported methods
router.all('/:artistid', middleware.supportedMethods('GET, PUT, DELETE, OPTIONS'));
router.all('/', middleware.supportedMethods('GET, POST, OPTIONS'));

//list artists
router.get('/', function(req, res, next) {

  Artist.find({} , fieldsFilter).lean().exec(function(err, artists){
    if (err) return next (err);

    artists.forEach(function(artist){
      addLinks(artist);
    });
    res.json(artists);
  });
});

//create new artist
router.post('/', function(req, res, next) {

    var newArtist = new Artist(req.body);
    newArtist.save(onModelSave(res, 201, true));
});

//get a artist
router.get('/:artistid', function(req, res, next) {
  Artist.findById(req.params.artistid, fieldsFilter).lean().exec(function(err, artist){
    if (err) return next (err);
    if (!artist) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    addLinks(artist);
    res.json(artist);
  });
});

//update a artist
router.put('/:artistid', function(req, res, next) {
  var data = req.body;

  Artist.findById(req.params.artistid, fieldsFilter, function(err, artist){
    if (err) return next (err);
    if (artist){
      artist.name = data.name;
      artist.genre = data.genre;
      artist.artwork = data.artwork;
      artist.dateCreated = data.dateCreated;

      artist.save(onModelSave(res));
    }else{
      //artist does not exist create it
      var newArtist = new Artist(data);
      newArtist._id = ObjectId(req.params.artistid);
      newArtist.save(onModelSave(res, 201, true));
    }
  });
});

//remove a artist
router.delete('/:artistid', function(req, res, next) {
  Artist.findById(req.params.artistid, fieldsFilter, function(err, artist){
    if (err) return next (err);
    if (!artist) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    artist.remove(function(err, removed){
      if (err) return next (err);
      res.status(204).end();
    })
  });
});

//edit an artist through a form
router.get('/:artistid/edit', function(req, res, next) {
  Artist.findById(req.params.artistid, fieldsFilter , function(err, artist){
    if (err) return next (err);
    if (!artist) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    
    var artistToReturn = [];
    artistToReturn.push({field_name: "name", field_value: artist.name});
    artistToReturn.push({field_name: "genre", field_value: artist.genre});
    artistToReturn.push({field_name: "artwork", field_value: artist.artwork});  
    artistToReturn.push({field_name: "dateCreated", field_value: artist.dateCreated});
    
    //return the form
    res.render('update_form', {title:"AtelierBeats API Server", id: artist._id, resource:"artists", fields: artistToReturn});
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

function addLinks(artist){
  artist.links = [
    { 
      "rel" : "self",
      "href" : config.url + "/artists/" + artist._id
    }
  ];
}

/** router for /artists */
module.exports = router;
