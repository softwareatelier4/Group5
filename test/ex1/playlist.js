'use strict';

//connect to DB
var mongoose   = require('mongoose');

var should = require('should');
var utils =  require('../utils');

//load model
require('../../models/User');
require('../../models/Artist');
require('../../models/Track');
require('../../models/Playlist');

describe('Ex1: Playlist Model', function(done){

  describe('Playlist model definition', function(){
    it('should have a constructor', function(){
      var Playlist;
      try{
        Playlist = mongoose.model('Playlist');
      }catch(err){
        console.log(err.stack);
      }finally{
        should.exist(Playlist, 'expected Playlist constructor to exist');
        Playlist.should.be.a.Function;
      }
    })
  });

  describe('When creating a new playlist', function(done){
    var User =  mongoose.model('User');
    var Artist =  mongoose.model('Artist');
    var Track =  mongoose.model('Track');
    var Playlist =  mongoose.model('Playlist');
    var user, artist, tracks;

    before(function(done){
      //connect and drop db
      utils.connectAndDropDb(function(err){
        if (err) return done(err);

        user = new User({
          userName : 'rob',
          firstName : 'Robert',
          lastName : 'Sapolsky',
          email : 'sapolsky@stanford.edu',
          password : 'robert123456',
          dateCreated : Date.now()
        });

        user.save(function(err, saved){
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
                name : 'What It Is',
                artist : artist._id,
                duration : 299,
                file : 'uploads/whatItIs.mp3',
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
    });

    after(utils.dropDbAndCloseConnection);
   
    it('should create an instance of the right type', function(){
      var playlist = new Playlist();
      playlist.constructor.name.should.equal('model');
      playlist.should.be.instanceof(Playlist);
    });

    it ('should persist a playlist with valid properties', function(done){
      var playlist = new Playlist();
      playlist.name = 'Mark Knopfler favs';
      // playlist.owner = user._id;
      playlist.tracks = [tracks[0]._id, tracks[1]._id];
      playlist.dateCreated = Date.now();
      playlist.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(playlist);
        done();
      });
    });

    it('should fail if name is empty, null, or undefined', function(done){
      var playlist = new Playlist();
      // playlist.owner = user._id;
      playlist.tracks = [tracks[0]._id, tracks[1]._id];
      playlist.dateCreated = Date.now();
      utils.errorIfNullUndefinedOrEmpty(playlist, 'name', done );
    });

    it('should fail if tracks is not an Array with ObjectIds',
      function(done){
      var playlist = new Playlist();
      playlist.name = 'Mark Knopfler favs';
      // playlist.owner = user._id;
      playlist.dateCreated = Date.now();
      utils.errorIfArrayObjectIdReferencesAreWrong(playlist, 'tracks', done );
    });

    it('if the dateCreated is empty, it should get assigned the value of Date.now', function(done){
      var playlist = new Playlist();
      playlist.name = 'Mark Knopfler favs';
      // playlist.owner = user._id;
      playlist.tracks = [tracks[0]._id, tracks[1]._id];

      var currentDate = Date.now();
      playlist.save(function(err, saved){
        //difference should be less than 1000s
        (playlist.dateCreated - currentDate).should.be.below(1000);
        done();
      });
    });
  });
});