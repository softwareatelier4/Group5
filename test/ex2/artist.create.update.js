'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var utils =  require('../utils');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var artists;

describe('Ex2: Testing Create and Update on /artists routes', function(){

  describe('POST /artists', function(){

    before(seed);
    after(utils.dropDb);

    it('should create a new artist if the data is valid', function(done){
      var newArtistData =  {
        "name" : "Bloc Party",
        "genre" : "Indie Rock",
        "artwork" : "http://www.eco.co.uk/content/uploads/images/Bloc%20Party%20New(1).jpg"
      };

      request(app)
        .post('/artists')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newArtistData)
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(201)
        .end(function(err, res){
          var resText = res.text;
          artists.forEach(function(artist){
            utils.matchArtistInfoInText(res.text, newArtistData);
          });
          done();
        });
    });

    it('should get a 400 Bad Request if data is invalid #1', function(done){
      var newArtistData =  {
        "artwork" : "http://www.eco.co.uk/content/uploads/images/Bloc%20Party%20New(1).jpg"
      };

      request(app)
        .post('/artists')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newArtistData)
        .expect(400, done);
    });

    it('should get a 400 Bad Request if data is invalid #2', function(done){
      var newArtistData =  {
        "genre" : "Indie Rock",
        "artwork" : "http://www.eco.co.uk/content/uploads/images/Bloc%20Party%20New(1).jpg"
      };

      request(app)
        .post('/artists')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newArtistData)
        .expect(400, done);
    });
  });

  describe('PUT /artists/:artistid', function(){
    before(seed);

    it('should update an existing artist', function(done){
      var newArtistData =  {
        "name" : "Bloc Party",
        "genre" : "Indie Rock",
        "artwork" : "http://www.eco.co.uk/content/uploads/images/Bloc%20Party%20New(1).jpg"
      };

      request(app)
        .put('/artists/' + artists[0]._id.toString())
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newArtistData)
        .expect(204)
        .end(function(err, res){
          var body = res.body;
          body.should.be.empty;

          //check if artist was updated
          request(app)
            .get('/artists/' + artists[0]._id.toString())
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/, 'it should respond with json' )
            .expect(200)
            .end(function(err, res){
              var resText = res.text;
              utils.matchArtistInfoInText(res.text, newArtistData);
              done();
            });

        });
    });

    it('should create a new artist if the artist does not exist', function(done){
      var newArtistData =  {
        "name" : "Kerri Chandler",
        "genre" : "Deep House, Garage",
        "artwork" : "http://www.higher-frequency.com/e_party_report/december04/04yellow/big02.jpg"
      };

      var obId = ObjectId();

      request(app)
        .put('/artists/' +obId)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newArtistData)
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(201)
        .end(function(err, res){
          utils.matchArtistInfoInText(res.text, newArtistData);

          //check if artist was created
          request(app)
            .get('/artists/' + obId)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/, 'it should respond with json' )
            .expect(200)
            .end(function(err, res){
              var resText = res.text;
              utils.matchArtistInfoInText(res.text, newArtistData);
              done();
            });

        });
    });

    it('should get a 400 Bad Request if data is invalid', function(done){
      var newArtistData =  {
        "genre" : "Deep House, Garage",
        "artwork" : "http://www.higher-frequency.com/e_party_report/december04/04yellow/big02.jpg"
      };

      request(app)
        .put('/artists/' + artists[0]._id.toString())
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newArtistData)
        .expect(400, done)
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
