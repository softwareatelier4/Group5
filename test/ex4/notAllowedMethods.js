'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var utils =  require('../utils');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var albums, artists, tracks, users;

describe('Ex4: Not allowed methods', function(){
  before(seed);
  after(utils.dropDb);

  describe('for /albums GET, POST and OPTIONS are allowed', function(){
    it('should allow OPTIONS for albums', function(done){
      request(app)
        .options('/albums')
        .set('Accept', 'application/json')
        .expect(200, done)
    });
    it('should NOT allow PUT for albums', function(done){
      request(app)
        .put('/albums')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow PATCH for albums', function(done){
      request(app)
        .patch('/albums')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow DELETE for albums', function(done){
      request(app)
        .delete('/albums')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow HEAD for albums', function(done){
      request(app)
        .head('/albums')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
  });

  describe('for /albums/:albumid GET, PUT, DELETE and OPTIONS are allowed', function(){
    it('should allow OPTIONS for album', function(done){
      request(app)
        .options('/albums/' + albums[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(200, done)
    });
    it('should NOT allow POST for album', function(done){
      request(app)
        .post('/albums/' + albums[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow PATCH for album', function(done){
      request(app)
        .patch('/albums/' + albums[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow HEAD for album', function(done){
      request(app)
        .head('/albums/' + albums[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(405, done)
    });
  });

  describe('for /artists GET, POST and OPTIONS are allowed', function(){
    it('should allow OPTIONS for artists', function(done){
      request(app)
        .options('/artists')
        .set('Accept', 'application/json')
        .expect(200, done)
    });
    it('should NOT allow PUT for artists', function(done){
      request(app)
        .put('/artists')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow PATCH for artists', function(done){
      request(app)
        .patch('/artists')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow DELETE for artists', function(done){
      request(app)
        .delete('/artists')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow HEAD for artists', function(done){
      request(app)
        .head('/artists')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
  });

  describe('for /artists/:artistid GET, PUT, DELETE and OPTIONS are allowed', function(){
    it('should allow OPTIONS for artist', function(done){
      request(app)
        .options('/artists/' + artists[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(200, done)
    });
    it('should NOT allow POST for artist', function(done){
      request(app)
        .post('/artists/' + artists[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow PATCH for artist', function(done){
      request(app)
        .patch('/artists/' + artists[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow HEAD for artist', function(done){
      request(app)
        .head('/artists/' + albums[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(405, done)
    });
  });

  describe('for /tracks GET, POST and OPTIONS are allowed', function(){
    it('should allow OPTIONS for tracks', function(done){
      request(app)
        .options('/tracks')
        .set('Accept', 'application/json')
        .expect(200, done)
    });
    it('should NOT allow PUT for tracks', function(done){
      request(app)
        .put('/tracks')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow PATCH for tracks', function(done){
      request(app)
        .patch('/tracks')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow DELETE for tracks', function(done){
      request(app)
        .delete('/tracks')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow HEAD for tracks', function(done){
      request(app)
        .head('/tracks')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
  });

  describe('for /tracks/:trackid GET, PUT, DELETE and OPTIONS are allowed', function(){
    it('should allow OPTIONS for track', function(done){
      request(app)
        .options('/tracks/' + tracks[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(200, done)
    });
    it('should NOT allow POST for track', function(done){
      request(app)
        .post('/tracks/' + tracks[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow PATCH for track', function(done){
      request(app)
        .patch('/tracks/' + tracks[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow HEAD for track', function(done){
      request(app)
        .head('/tracks/' + tracks[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(405, done)
    });
  });

  describe('for /users GET, POST and OPTIONS are allowed', function(){
    it('should allow OPTIONS for users', function(done){
      request(app)
        .options('/users')
        .set('Accept', 'application/json')
        .expect(200, done)
    });
    it('should NOT allow PUT for users', function(done){
      request(app)
        .put('/users')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow PATCH for users', function(done){
      request(app)
        .patch('/users')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow DELETE for users', function(done){
      request(app)
        .delete('/users')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow HEAD for users', function(done){
      request(app)
        .head('/users')
        .set('Accept', 'application/json')
        .expect(405, done)
    });
  });

  describe('for /users/:userid GET, PUT, DELETE and OPTIONS are allowed', function(){
    it('should allow OPTIONS for user', function(done){
      request(app)
        .options('/users/' + users[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(200, done)
    });
    it('should NOT allow POST for user', function(done){
      request(app)
        .post('/users/' + users[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow PATCH for user', function(done){
      request(app)
        .patch('/users/' + users[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow HEAD for user', function(done){
      request(app)
        .head('/users/' + albums[0]._id.toString())
        .set('Accept', 'application/json')
        .expect(405, done)
    });
  });

  describe('for /users/:userid/playlists GET, PUT and OPTIONS are allowed', function(){
    it('should allow OPTIONS for playlists', function(done){
      request(app)
        .options('/users/' + users[0]._id.toString() + "/playlists")
        .set('Accept', 'application/json')
        .expect(200, done)
    });
    it('should NOT allow POST for playlists', function(done){
      request(app)
        .post('/users/' + users[0]._id.toString() + "/playlists")
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow DELETE for playlists', function(done){
      request(app)
        .delete('/users/' + users[0]._id.toString() + "/playlists")
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow PATCH for playlists', function(done){
      request(app)
        .patch('/users/' + users[0]._id.toString() + "/playlists")
        .set('Accept', 'application/json')
        .expect(405, done)
    });
    it('should NOT allow HEAD for playlists', function(done){
      request(app)
        .head('/users/' + albums[0]._id.toString() + "/playlists")
        .set('Accept', 'application/json')
        .expect(405, done)
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
