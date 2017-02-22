'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var utils =  require('../utils');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var tracks, users;

describe('Ex2: Testing Update on /users/:userid/playlists routes', function(){


  describe('PUT /users/:userid/playlists', function(){
    before(seed);

    it('should update the playlists', function(done){
      var newPlaylistData = [
        {
          "name" : 'Thrash Metal favs',
          "tracks": [tracks[0]._id, tracks[1]._id]
        },
        {
          "name" : 'Thrash Metal favs 2',
          "tracks": [tracks[3]._id, tracks[4]._id]
        },
        {
          "name" : 'Thrash Metal favs 3',
          "tracks": [tracks[5]._id, tracks[6]._id]
        }
      ]

      request(app)
        .put('/users/' + users[0]._id.toString() + '/playlists')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newPlaylistData)
        .expect(204)
        .end(function(err, res){
          var body = res.body;
          body.should.be.empty;

          //check if user playlists were updated
          request(app)
            .get('/users/' + users[0]._id.toString() + '/playlists')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/, 'it should respond with json' )
            .expect(200)
            .end(function(err, res){
              var resText = res.text;
              utils.matchPlaylistInfoInText(res.text, newPlaylistData);
              done();
            });

        });
    });

    it('should get a 400 Bad Request if data is invalid', function(done){
       var newPlaylistData = [
        {
          "tracks": [tracks[0]._id, tracks[1]._id]
        }
      ]
      request(app)
        .put('/users/' + users[0]._id.toString() + '/playlists')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newPlaylistData)
        .expect(400, done)
    });
  });
});

function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    tracks = seedData[2].data;
    users = seedData[3].data;
    done();
  });
}
