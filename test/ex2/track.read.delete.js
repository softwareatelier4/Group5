'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var utils =  require('../utils');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var tracks;

describe('Ex2: Testing Read and Delete for /tracks routes', function(){

  describe('GET /tracks', function(){

    before(seed);
    after(utils.dropDb);

    it('should list all the tracks with correct data', function(done){
      request(app)
        .get('/tracks')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resText = res.text;
          tracks.forEach(function(track){
            utils.matchTrackInfoInText(res.text, track);
          });
          done();
        });
    });
  });

  describe('GET /tracks/:trackid', function(){

    before(seed);
    after(utils.dropDb);

    it('should list the track with correct data', function(done){
      request(app)
        .get('/tracks/' + tracks[1]._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resText = res.text;
          utils.matchTrackInfoInText(res.text, tracks[1]);
          done();
        });
    });

    it('should respond with a 404 if the track does not exist', function(done){
      request(app)
        .get('/tracks/' + ObjectId().toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

  describe('DELETE /tracks/:trackid', function(){

    before(seed);
    after(utils.dropDb);

    it('should delete an existing track', function(done){
      request(app)
        .del('/tracks/' + tracks[1]._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(204)
        .end(function(err, res){
          res.text.should.be.empty;
          res.body.should.be.empty;
          done();
        });
    });

    it('should not list the previous resource', function(done){
      request(app)
        .get('/tracks/' + tracks[1]._id.toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should respond with a 404 for a previously deleted resource', function(done){
      request(app)
        .delete('/tracks/' + tracks[1]._id.toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should respond with a 404 if the track does not exist', function(done){
      request(app)
        .delete('/tracks/' + ObjectId().toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

});

function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    tracks = seedData[2].data;
    done();
  });
}
