'use strict';

//connect to DB
var mongoose   = require('mongoose');

var should = require('should');
var utils =  require('../utils');

//load model
require('../../models/Artist');
require('../../models/Track');
require('../../models/Album');

describe('Ex1: Album Model', function(done){

  describe('Album model definition', function(){
    it('should have a constructor', function(){
      var Album;
      try{
        Album = mongoose.model('Album');
      }catch(err){
        console.log(err.stack);
      }finally{
        should.exist(Album, 'expected Album constructor to exist');
        Album.should.be.a.Function;
      }
    })
  });

  describe('When creating a new album', function(done){
    var Artist =  mongoose.model('Artist');
    var Track =  mongoose.model('Track');
    var Album =  mongoose.model('Album');
    var artist, tracks;

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
            
          //create tracks
          Track.create([
            {
              name : 'Boom, Like That',
              artist : artist._id,
              duration : 349,
              file : 'uploads/boomLikeThat.mp3',
              id3Tags : [],
              dateReleased : Date.now(),
              dateCreated : Date.now()
            },
            {
              name : 'The Trawlerman\'s Song',
              artist : artist._id,
              duration : 293,
              file : 'uploads/theTrawlermansSong.mp3',
              id3Tags : [],
              dateReleased : Date.now(),
              dateCreated : Date.now()
            }
          ], function(err, trks){
             if (err) return done(err);
             tracks = trks;
             done();
          });
        });
      });
    });

    after(utils.dropDbAndCloseConnection);
   
    it('should create an instance of the right type', function(){
      var album = new Album();
      album.constructor.name.should.equal('model');
      album.should.be.instanceof(Album);
    });

    it ('should persist a album with valid properties', function(done){
      var album = new Album();
      album.name = 'Shangri La';
      album.artist = artist._id;
      album.artwork = '';
      album.tracks = [tracks[0]._id, tracks[1]._id];
      album.dateCreated = Date.now();
      album.dateReleased = new Date('September 27, 2004');
      album.label = 'Mercury Records';
      album.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(album);
        done();
      });
    });

    it('should fail if name is empty, null, or undefined', function(done){
      var album = new Album();
      album.artist = artist._id;
      album.artwork = '';
      album.tracks = [tracks[0]._id, tracks[1]._id];
      album.dateCreated = Date.now();
      album.dateReleased = new Date('September 27, 2004');
      album.label = 'Mercury Records';
      utils.errorIfNullUndefinedOrEmpty(album, 'name', done );
    });

    it('should fail if tracks is not an Array with ObjectIds',
      function(done){
      var album = new Album();
      album.name = 'Shangri La';
      album.artist = artist._id;
      album.artwork = '';
      album.dateCreated = Date.now();
      album.dateReleased = new Date('September 27, 2004');
      album.label = 'Mercury Records';
      utils.errorIfArrayObjectIdReferencesAreWrong(album, 'tracks', done );
    });

    it('should fail if artist is null, or undefined', function(done){
      var album = new Album();
      album.name = 'Shangri La';
      album.artwork = '';
      album.tracks = [tracks[0]._id, tracks[1]._id];
      album.dateCreated = Date.now();
      album.dateReleased = new Date('September 27, 2004');
      album.label = 'Mercury Records';
      utils.errorIfNullOrUndefined(album, 'artist', done );
    });

    it('should fail if artist is not an ObjectId', function(done){
      var album = new Album();
      album.name = 'Shangri La';
      album.artwork = '';
      album.tracks = [tracks[0]._id, tracks[1]._id];
      album.dateCreated = Date.now();
      album.dateReleased = new Date('September 27, 2004');
      album.label = 'Mercury Records';
      utils.errorIfObjectIdReferenceIsWrong(album, 'artist', done );
    });

    it('if artwork is empty; null; or undefined, it should get assigned the value ``',
      function(done){
      var album = new Album();
      album.name = 'Shangri La';
      album.artist = artist._id;
      album.artwork = '';
      album.tracks = [tracks[0]._id, tracks[1]._id];
      album.dateCreated = Date.now();
      album.dateReleased = new Date('September 27, 2004');
      album.label = 'Mercury Records';
      album.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        album.artwork.should.equal('');
        done();
      });
    });

    it('if the dateCreated is empty, it should get assigned the value of Date.now', function(done){
      var album = new Album();
      album.name = 'Shangri La';
      album.artist = artist._id;
      album.artwork = '';
      album.tracks = [tracks[0]._id, tracks[1]._id];
      album.dateReleased = new Date('September 27, 2004');
      album.label = 'Mercury Records';

      var currentDate = Date.now();
      album.save(function(err, saved){
        //difference should be less than 1000s
        (album.dateCreated - currentDate).should.be.below(1000);
        done();
      });
    });

    it('if the dateReleased is empty, it should get assigned the value of Date.now', function(done){
      var album = new Album();
      album.name = 'Shangri La';
      album.artist = artist._id;
      album.artwork = '';
      album.tracks = [tracks[0]._id, tracks[1]._id];
      album.dateCreated = Date.now();
      album.label = 'Mercury Records';

      var currentDate = Date.now();
      album.save(function(err, saved){
        //difference should be less than 1000s
        (album.dateReleased - currentDate).should.be.below(1000);
        done();
      });
    });

    it('if label is empty; null; or undefined, it should get assigned the value `USI-INF records`',
      function(done){
      var album = new Album();
      album.name = 'Shangri La';
      album.artist = artist._id;
      album.artwork = '';
      album.tracks = [tracks[0]._id, tracks[1]._id];
      album.dateCreated = Date.now();
      album.dateReleased = new Date('September 27, 2004');
      album.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        album.label.should.equal('USI-INF records');
        done();
      })
    });
  });
});