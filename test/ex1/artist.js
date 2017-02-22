'use strict';

//connect to DB
var mongoose   = require('mongoose');

var should = require('should');
var utils =  require('../utils');

//load model
require('../../models/Artist');

describe('Ex1: Artist Model', function(done){

  describe('Artist model definition', function(){
    it('should have a constructor', function(){
      var Artist;
      try{
        Artist = mongoose.model('Artist');
      }catch(err){
        console.log(err.stack);
      }finally{
        should.exist(Artist, 'expected Artist constructor to exist');
        Artist.should.be.a.Function;
      }
    })
  });

  describe('When creating a new artist', function(done){
    var Artist = mongoose.model('Artist');

    before(function(done){
      //connect and drop db
      utils.connectAndDropDb(function(err){
        if (err) return done(err);
        done()
      });
    });

    after(utils.dropDbAndCloseConnection);
   
    it('should create an instance of the right type', function(){
      var artist = new Artist();
      artist.constructor.name.should.equal('model');
      artist.should.be.instanceof(Artist);
    });

    it('should persist a artist with valid properties', function(done){
      var artist = new Artist();
      artist.name = 'Mark Knopfler';
      artist.genre = 'Rock, roots rock, Celtic rock, blues-rock';
      artist.artwork = '';
      artist.dateCreated = Date.now();
      artist.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(artist);
        done();
      });
    });

    it('should fail if name is empty, null, or undefined', function(done){
      var artist = new Artist();
      artist.genre = 'Rock, roots rock, Celtic rock, blues-rock';
      artist.artwork = '';
      artist.dateCreated = Date.now();
      utils.errorIfNullUndefinedOrEmpty(artist, 'name', done );
    });

    it('if genre is empty; null; or undefined, it should get assigned the value `rock`',
      function(done){
      var artist = new Artist();
      artist.name = 'Mark Knopfler';
      artist.artwork = '';
      artist.dateCreated = Date.now();
      artist.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        artist.genre.should.equal('rock');
        done();
      });
    });

    it('if artwork is empty; null; or undefined, it should get assigned the value ``',
      function(done){
      var artist = new Artist();
      artist.name = 'Mark Knopfler';
      artist.genre = 'Rock, roots rock, Celtic rock, blues-rock';
      artist.dateCreated = Date.now();
      artist.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        artist.artwork.should.equal('');
        done();
      });
    });

    it('if the dateCreated is empty, it should get assigned the value of Date.now', function(done){
      var artist = new Artist();
      artist.name = 'Mark Knopfler';
      artist.genre = 'Rock, roots rock, Celtic rock, blues-rock';
      artist.artwork = '';

      var currentDate = Date.now();
      artist.save(function(err, saved){
        //difference should be less than 1000s
        (artist.dateCreated - currentDate).should.be.below(1000);
        done();
      });
    });
  });
});