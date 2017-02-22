'use strict';

//connect to DB
var mongoose   = require('mongoose');

var should = require('should');
var utils =  require('../utils');

//load model
require('../../models/Artist');
require('../../models/Track');
require('../../models/Album');

describe('Ex1: Track Model', function(done){

  describe('Track model definition', function(){
    it('should exist', function(){
      var Track;
      try{
        Track = mongoose.model('Track');
      }catch(err){
        console.log(err.stack)
      }finally{
        should.exist(Track, 'expected Track constructor to exist');
        Track.should.be.a.Function;
      }
    });
  });

  describe('When creating a new track', function(done){
    var Artist = mongoose.model('Artist');
    var Track = mongoose.model('Track');
    var Album = mongoose.model('Album');
    var artist, album;

    before(function(done){
      //connect and drop db
      utils.connectAndDropDb(function(err){
        if (err) return done(err);

        artist = new Artist({
          name : 'Mark Knopfler',
          genre : 'Rock, roots rock, Celtic rock, blues-rock'
        });

        artist.save(function(err,save){
          if (err) return done(err);
            
          album = new Album({
            name : 'Shangri La',
            artist : artist._id,
            dateCreated : Date.now(),
            dateReleased : new Date('September 27, 2004'),
            label : 'Mercury Records'
          });

          album.save(function(err, saved){
            if (err) return done(err);
            done();
          })
        });
      });
    });

    after(utils.dropDbAndCloseConnection);

   
    it('should create an instance of the right type', function(){
      var track = new Track();
      track.constructor.name.should.equal('model');
      track.should.be.instanceof(Track);
    });

    it('should persist a track with valid properties', function(done){
      var track = new Track();
      track.name = 'Boom, Like That';
      track.artist = artist._id;
      track.album = album._id;
      track.duration = 349;
      track.file = 'uploads/boomLikeThat.mp3';
      track.id3Tags = [];
      track.dateReleased = Date.now();
      track.dateCreated = Date.now();
      track.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(track);
        done();
      });
    });

    it('should fail if artist is null, or undefined', function(done){
      var track = new Track();
      track.name = 'Boom, Like That';
      track.album = album._id;
      track.duration = 349;
      track.file = 'uploads/boomLikeThat.mp3';
      track.id3Tags = [];
      track.dateReleased = Date.now();
      track.dateCreated = Date.now();
      utils.errorIfNullOrUndefined(track, 'artist', done );
    });

    it('should fail if artist is not an ObjectId', function(done){
      var track = new Track();
      track.name = 'Boom, Like That';
      track.album = album._id;
      track.duration = 349;
      track.file = 'uploads/boomLikeThat.mp3';
      track.id3Tags = [];
      track.dateReleased = Date.now();
      track.dateCreated = Date.now();
      utils.errorIfObjectIdReferenceIsWrong(track, 'artist', done );
    });

      it('should fail if album is not an ObjectId', function(done){
      var track = new Track();
      track.name = 'Boom, Like That';
      track.artist = artist._id;
      track.duration = 349;
      track.file = 'uploads/boomLikeThat.mp3';
      track.id3Tags = [];
      track.dateReleased = Date.now();
      track.dateCreated = Date.now();
      utils.errorIfObjectIdReferenceIsWrong(track, 'album', done );
    });

    it('if id3Tags is empty; null; or undefined, it should get assigned the value of an empty array',
       function(done){
      var track = new Track();
      track.name = 'Boom, Like That';
      track.artist = artist._id;
      track.album = album._id;
      track.duration = 349;
      track.file = 'uploads/boomLikeThat.mp3';
      track.dateReleased = Date.now();
      track.dateCreated = Date.now();
      track.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        //track.id3Tags.should.be.an.array;
        track.id3Tags.should.be.empty;
        done();
      })
    });

    it('if the dateReleased is empty, it should get assigned the value of Date.now', function(done){
      var track = new Track();
      track.name = 'Boom, Like That';
      track.artist = artist._id;
      track.album = album._id;
      track.duration = 349;
      track.file = 'uploads/boomLikeThat.mp3';
      track.id3Tags = [];
      track.dateCreated = Date.now();
      
      var currentDate = Date.now();
      track.save(function(err, saved){
        //difference should be less than 1000s
        (track.dateReleased - currentDate).should.be.below(1000);
        done();
      });
    });

    it('if the dateCreated is empty, it should get assigned the value of Date.now', function(done){
      var track = new Track();
      track.name = 'Boom, Like That';
      track.artist = artist._id;
      track.album = album._id;
      track.duration = 349;
      track.file = 'uploads/boomLikeThat.mp3';
      track.id3Tags = [];
      track.dateReleased = Date.now();

      var currentDate = Date.now();
      track.save(function(err, saved){
        //difference should be less than 1000s
        (track.dateCreated - currentDate).should.be.below(1000);
        done();
      });
    });

  });
});