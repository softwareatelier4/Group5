'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var utils =  require('../utils');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var albums, artists, tracks, users;

describe('Ex3: Hypermedia', function(){
   before(seed);
  after(utils.dropDb);

  describe('GET /albums', function(){
    it('should list correct links for all albums', function(done){
      request(app)
        .get('/albums')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resObj = JSON.parse(res.text);
          resObj.forEach(function(album){
            utils.checkLinksForAlbum(album);
          });
          done();
        });
    });
  });

  describe('GET /albums/:albumid', function(){
    it('should list correct links for an album', function(done){
      request(app)
        .get('/albums/' + albums[1]._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var album = JSON.parse(res.text);
          utils.checkLinksForAlbum(album);
          done();
        });
    });
  });

  describe('GET /artists', function(){
    it('should list correct links for all artists', function(done){
      request(app)
        .get('/artists')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resObj = JSON.parse(res.text);
          resObj.forEach(function(artist){
            utils.checkLinksForArtist(artist);
          });
          done();
        });
    });
  });

  describe('GET /artists/:artistid', function(){
    it('should list correct links for an artist', function(done){
      request(app)
        .get('/artists/' + artists[1]._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var artist = JSON.parse(res.text);
          utils.checkLinksForArtist(artist);
          done();
        });
    });
  });

  describe('GET /tracks', function(){
    it('should list correct links for all tracks', function(done){
      request(app)
        .get('/tracks')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resObj = JSON.parse(res.text);
          resObj.forEach(function(track){
            utils.checkLinksForTrack(track);
          });
          done();
        });
    });
  });

  describe('GET /tracks/:trackid', function(){
    it('should list correct links for an track', function(done){
      request(app)
        .get('/tracks/' + tracks[1]._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var track = JSON.parse(res.text);
          utils.checkLinksForTrack(track);
          done();
        });
    });
  });

  describe('GET /users', function(){
    it('should list correct links for all users', function(done){
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resObj = JSON.parse(res.text);
          resObj.forEach(function(user){
            utils.checkLinksForUser(user);
          });
          done();
        });
    });
  });

  describe('GET /users/:userid', function(){
    it('should list correct links for an user', function(done){
      request(app)
        .get('/users/' + users[1]._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var user = JSON.parse(res.text);
          utils.checkLinksForUser(user);
          done();
        });
    });
  });
});



function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    artists = seedData[0].data;
    albums = seedData[1].data;
    tracks = seedData[2].data;
    users = seedData[3].data;
    done();
  });
}
