'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var utils =  require('../utils');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var albums;

describe('Ex2: Testing Read and Delete for /albums routes', function(){

  describe('GET /albums', function(){

    before(seed);
    after(utils.dropDb);

    it('should list all the albums with correct data', function(done){
      request(app)
        .get('/albums')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resText = res.text;
          albums.forEach(function(album){
            utils.matchAlbumInfoInText(res.text, album);
          });
          done();
        });
    });
  });

  describe('GET /albums/:albumid', function(){

    before(seed);
    after(utils.dropDb);

    it('should list the album with correct data', function(done){
      request(app)
        .get('/albums/' + albums[1]._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resText = res.text;
          utils.matchAlbumInfoInText(res.text, albums[1]);
          done();
        });
    });

    it('should respond with a 404 if the album does not exist', function(done){
      request(app)
        .get('/albums/' + ObjectId().toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

  describe('DELETE /albums/:albumid', function(){

    before(seed);
    after(utils.dropDb);

    it('should delete an existing album', function(done){
      request(app)
        .del('/albums/' + albums[1]._id.toString())
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
        .get('/albums/' + albums[1]._id.toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should respond with a 404 for a previously deleted resource', function(done){
      request(app)
        .delete('/albums/' + albums[1]._id.toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should respond with a 404 if the album does not exist', function(done){
      request(app)
        .delete('/albums/' + ObjectId().toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

});

function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    albums = seedData[1].data;
    done();
  });
}
