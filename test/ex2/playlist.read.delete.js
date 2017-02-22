'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var utils =  require('../utils');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var users;

describe('Ex2: Testing Read for /users/:userid/playlist routes', function(){

  describe('GET /users/:userid/playlists', function(){

    before(seed);
    after(utils.dropDb);

    it('should list the user\'s playlist with correct data', function(done){
      request(app)
        .get('/users/' + users[1]._id.toString() + '/playlists')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resText = res.text;
          utils.matchPlaylistInfoInText(res.text, users[1].playlists);
          done();
        });
    });

    it('should respond with a 404 if the user does not exist', function(done){
      request(app)
        .get('/users/' + ObjectId().toString() + '/playlists')
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });
});

function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    users = seedData[3].data;
    done();
  });
}

