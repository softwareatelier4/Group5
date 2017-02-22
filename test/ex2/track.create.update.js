'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var utils =  require('../utils');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var tracks, album, artist;

describe('Ex2: Testing Create and Update on /tracks routes', function(){

  describe('POST /tracks', function(){

    before(seed);
    after(utils.dropDb);

    it('should create a new track if the data is valid', function(done){
      var newTrackData = {
        "artist"       : artist._id.toString(),
        "album"        : album._id.toString(),
        "name"         : "Sea Of Madness",
        "duration"     : 342,
        "file"         : "tracks_folder/3.mp3",
        "id3Tags"      : "",
        "dateReleased" : album.dateReleased,
        "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
      };

      request(app)
        .post('/tracks')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newTrackData)
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(201)
        .end(function(err, res){
          var resText = res.text;
          tracks.forEach(function(track){
            utils.matchTrackInfoInText(res.text, newTrackData);
          });
          done();
        });
    });

    it('should get a 400 Bad Request if data is invalid #1', function(done){
      var newTrackData = {
        "album"        : album._id.toString(),
        "name"         : "Sea Of Madness",
        "duration"     : 342,
        "file"         : "tracks_folder/3.mp3",
        "id3Tags"      : "",
        "dateReleased" : album.dateReleased,
        "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
      };

      request(app)
        .post('/tracks')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newTrackData)
        .expect(400, done);
    });

    it('should get a 400 Bad Request if data is invalid #2', function(done){
      var newTrackData = {
        "artist"       : artist._id.toString(),
        "album"        : album._id.toString(),
        "duration"     : 342,
        "id3Tags"      : "",
        "dateReleased" : album.dateReleased,
        "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
      };

      request(app)
        .post('/tracks')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newTrackData)
        .expect(400, done);
    });
  });

  describe('PUT /tracks/:trackid', function(){
    before(seed);

    it('should update an existing track', function(done){
      var newTrackData = {
        "artist"       : artist._id.toString(),
        "album"        : album._id.toString(),
        "name"         : "Sea Of Madness",
        "duration"     : 342,
        "file"         : "tracks_folder/3.mp3",
        "id3Tags"      : "",
        "dateReleased" : album.dateReleased,
        "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
      };

      request(app)
        .put('/tracks/' + tracks[0]._id.toString())
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newTrackData)
        .expect(204)
        .end(function(err, res){
          var body = res.body;
          body.should.be.empty;

          //check if track was updated
          request(app)
            .get('/tracks/' + tracks[0]._id.toString())
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/, 'it should respond with json' )
            .expect(200)
            .end(function(err, res){
              var resText = res.text;
              utils.matchTrackInfoInText(res.text, newTrackData);
              done();
            });

        });
    });

    it('should create a new track if the track does not exist', function(done){
      var newTrackData = {
        "artist"       : artist._id.toString(),
        "album"        : album._id.toString(),
        "name"         : "Heaven Can Wait",
        "duration"     : 444,
        "file"         : "tracks_folder/4.mp3",
        "id3Tags"      : "",
        "dateReleased" : album.dateReleased,
        "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
      };

      var obId = ObjectId();

      request(app)
        .put('/tracks/' +obId)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newTrackData)
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(201)
        .end(function(err, res){
          utils.matchTrackInfoInText(res.text, newTrackData);

          //check if track was created
          request(app)
            .get('/tracks/' + obId)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/, 'it should respond with json' )
            .expect(200)
            .end(function(err, res){
              var resText = res.text;
              utils.matchTrackInfoInText(res.text, newTrackData);
              done();
            });

        });
    });

    it('should get a 400 Bad Request if data is invalid', function(done){
      var newTrackData = {
        "duration"     : 444,
        "file"         : "tracks_folder/4.mp3",
        "id3Tags"      : "",
        "dateReleased" : album.dateReleased,
        "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
      };

      request(app)
        .put('/tracks/' + tracks[0]._id.toString())
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newTrackData)
        .expect(400, done)
    });
  });
});

function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    tracks = seedData[2].data;
    album = seedData[1].data[0];
    artist = seedData[0].data[0];
    done();
  });
}
