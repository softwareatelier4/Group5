'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var utils =  require('../utils');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var artists;

describe('Ex2: Testing Read and Delete for /artists routes', function(){

  describe('GET /artists', function(){

    before(seed);
    after(utils.dropDb);

    it('should list all the artists with correct data', function(done){
      request(app)
        .get('/artists')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resText = res.text;
          artists.forEach(function(artist){
            utils.matchArtistInfoInText(res.text, artist);
          });
          done();
        });
    });
  });

  describe('GET /artists/:artistid', function(){

    before(seed);
    after(utils.dropDb);

    it('should list the artist with correct data', function(done){
      request(app)
        .get('/artists/' + artists[1]._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resText = res.text;
          utils.matchArtistInfoInText(res.text, artists[1]);
          done();
        });
    });

    it('should respond with a 404 if the artist does not exist', function(done){
      request(app)
        .get('/artists/' + ObjectId().toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

  describe('DELETE /artists/:artistid', function(){

    before(seed);
    after(utils.dropDb);

    it('should delete an existing artist', function(done){
      request(app)
        .del('/artists/' + artists[1]._id.toString())
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
        .get('/artists/' + artists[1]._id.toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should respond with a 404 for a previously deleted resource', function(done){
      request(app)
        .delete('/artists/' + artists[1]._id.toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should respond with a 404 if the artist does not exist', function(done){
      request(app)
        .delete('/artists/' + ObjectId().toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

});

function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    artists = seedData[0].data;
    done();
  });
}
