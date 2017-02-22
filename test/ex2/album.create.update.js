'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var utils =  require('../utils');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var albums, artist;

describe('Ex2: Testing Create and Update on /albums routes', function(){

  describe('POST /albums', function(){

    before(seed);
    after(utils.dropDb);

    it('should create a new album if the data is valid', function(done){

      var newAlbumData =  {
        "artist"       : artist._id.toString(),
        "name"         : "Seventh Son Of A Seventh Son",
        "artwork"      : "http://s.pixogs.com/image/R-4505525-1366796755-1296.jpeg",
        "dateReleased" : "Mon Apr 11 1988 00:00:00 GMT+0100 (CET)",
        "label"        : "EMI"
      };

      request(app)
        .post('/albums')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newAlbumData)
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(201)
        .end(function(err, res){
          var resText = res.text;
          albums.forEach(function(album){
            utils.matchAlbumInfoInText(res.text, newAlbumData);
          });
          done();
        });
    });

    it('should get a 400 Bad Request if data is invalid #1', function(done){
      var newAlbumData =  {
        "artist"       : artist._id.toString(),
      };

      request(app)
        .post('/albums')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newAlbumData)
        .expect(400, done);
    });

    it('should get a 400 Bad Request if data is invalid #2', function(done){
      var newAlbumData =  {
        "name"         : "Seventh Son Of A Seventh Son",
        "artwork"      : "http://s.pixogs.com/image/R-4505525-1366796755-1296.jpeg",
        "dateReleased" : "Mon Apr 11 1988 00:00:00 GMT+0100 (CET)",
        "label"        : "EMI",
        "tracks"       : [ObjectId(), ObjectId()] 
      };

      request(app)
        .post('/albums')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newAlbumData)
        .expect(400, done);
    });
  });

  describe('PUT /albums/:albumid', function(){
    before(seed);

    it('should update an existing album', function(done){
      var newAlbumData =  {
        "artist"       : artist._id.toString(),
        "name"         : "Seventh Son Of A Seventh Son (Remastered)",
        "artwork"      : "http://s.pixogs.com/image/R-4505525-1366796755-1296.jpeg",
        "dateReleased" : "Mon Apr 11 1988 00:00:00 GMT+0100 (CET)",
        "label"        : "EMI"
      };

      request(app)
        .put('/albums/' + albums[0]._id.toString())
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newAlbumData)
        .expect(204)
        .end(function(err, res){
          var body = res.body;
          body.should.be.empty;

          //check if album was updated
          request(app)
            .get('/albums/' + albums[0]._id.toString())
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/, 'it should respond with json' )
            .expect(200)
            .end(function(err, res){
              var resText = res.text;
              utils.matchAlbumInfoInText(res.text, newAlbumData);
              done();
            });

        });
    });

    it('should create a new album if the album does not exist', function(done){
      var newAlbumData =  {
        "artist"       : artist._id.toString(),
        "name"         : "A Real LIVE One",
        "artwork"      : "http://s.pixogs.com/image/R-5776767-1402351744-5097.jpeg",
        "dateReleased" : "Mon Mar 15 1993 00:00:00 GMT+0100 (CET)",
        "label"        : "EMI"
      };

      var obId = ObjectId();

      request(app)
        .put('/albums/' +obId)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newAlbumData)
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(201)
        .end(function(err, res){
          utils.matchAlbumInfoInText(res.text, newAlbumData);

          //check if album was created
          request(app)
            .get('/albums/' + obId)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/, 'it should respond with json' )
            .expect(200)
            .end(function(err, res){
              var resText = res.text;
              utils.matchAlbumInfoInText(res.text, newAlbumData);
              done();
            });

        });
    });

    it('should get a 400 Bad Request if data is invalid', function(done){
      var newAlbumData =  {
        "name"         : "Seventh Son Of A Seventh Son (Remastered)",
        "artwork"      : "http://s.pixogs.com/image/R-4505525-1366796755-1296.jpeg",
        "dateReleased" : "Mon Apr 11 1988 00:00:00 GMT+0100 (CET)",
        "label"        : "EMI"
      };

      request(app)
        .put('/albums/' + albums[0]._id.toString())
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newAlbumData)
        .expect(400, done)
    });
  });
});

function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    albums = seedData[1].data;
    artist = seedData[0].data[0];
    done();
  });
}
