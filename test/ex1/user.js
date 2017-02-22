'use strict';

//connect to DB
var mongoose   = require('mongoose');

var should = require('should');
var utils =  require('../utils');

//load model
require('../../models/Playlist');
require('../../models/User');

describe('Ex1: User Model', function(done){

  describe('User model definition', function(){
    it('should have a constructor', function(){
      var User;
      try{
        User = mongoose.model('User');
      }catch(err){
        console.log(err.stack);
      }finally{
        should.exist(User, 'expected User constructor to exist');
        User.should.be.a.Function;
      }
    })
  });

  describe('When creating a new user', function(done){
    var Playlist = mongoose.model('Playlist');
    var User = mongoose.model('User');

    before(utils.connectAndDropDb);

    after(utils.dropDbAndCloseConnection);
   
    it('should create an instance of the right type', function(){
      var user = new User();
      user.constructor.name.should.equal('model');
      user.should.be.instanceof(User);
    });

    it('should persist a user with valid properties', function(done){
      var user = new User();
      user.userName = 'rob';
      user.firstName = 'Robert';
      user.lastName = 'Sapolsky';
      user.email = 'sapolsky@stanford.edu';
      user.password = 'robert123456';
      user.dateCreated = Date.now();
      user.playlists = [new Playlist({
        name: "oldies"
      })];
      user.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(user);
        done();
      });
    });

    it('should fail if userName is empty, null, or undefined', function(done){
      var user = new User();
      user.firstName = 'Robert';
      user.lastName = 'Sapolsky';
      user.email = 'sapolsky@stanford.edu';
      user.password = 'robert123456';
      user.dateCreated = Date.now();
      user.playlists = [new Playlist({
        name: "oldies"
      })];
      utils.errorIfNullUndefinedOrEmpty(user, 'userName', done );
    });

    it('should fail if password is empty, null, or undefined', function(done){
      var user = new User();
      user.userName = 'rob';
      user.firstName = 'Robert';
      user.lastName = 'Sapolsky';
      user.email = 'sapolsky@stanford.edu';
      user.dateCreated = Date.now();
      user.playlists = [new Playlist({
        name: "oldies"
      })];
      utils.errorIfNullUndefinedOrEmpty(user, 'userName', done );
    });

    it('should fail if email is empty, null, or undefined', function(done){
      var user = new User();
      user.userName = 'rob';
      user.firstName = 'Robert';
      user.lastName = 'Sapolsky';
      user.password = 'robert123456';
      user.dateCreated = Date.now();
      utils.errorIfNullUndefinedOrEmpty(user, 'userName', done );
    });

    it('if firstName is empty; null; or undefined, it should get assigned the value of userName',
       function(done){
      var user = new User();
      user.userName = 'rob';
      user.lastName = 'Sapolsky';
      user.email = 'sapolsky@stanford.edu';
      user.password = 'robert123456';
      user.dateCreated = Date.now();
      user.playlists = [new Playlist({
        name: "oldies"
      })];
      user.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        user.firstName.should.equal(user.userName);
        done();
      });
    });

    it('if lastName is empty; null; or undefined, it should get assigned the value of userName',
       function(done){
      var user = new User();
      user.userName = 'rob';
      user.firstName = 'Robert';
      user.email = 'sapolsky@stanford.edu';
      user.password = 'robert123456';
      user.dateCreated = Date.now();
      user.playlists = [new Playlist({
        name: "oldies"
      })];
      user.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        user.lastName.should.equal(user.userName);
        done();
      });
    });

    it('if the dateCreated is empty, it should get assigned the value of Date.now', function(done){
      var user = new User();
      user.userName = 'rob';
      user.firstName = 'Robert';
      user.lastName = 'Sapolsky';
      user.email = 'sapolsky@stanford.edu';
      user.password = 'robert123456';
      user.playlists = [new Playlist({
        name: "oldies"
      })];

      var currentDate = Date.now();
      user.save(function(err, saved){
        //difference should be less than 1000s
        (user.dateCreated - currentDate).should.be.below(1000);
        done();
      });
    });

    it('should fail if playlists is not an Array of PlaylistSchemas', function(done){
      var user = new User();
      user.userName = 'rob';
      user.firstName = 'Robert';
      user.lastName = 'Sapolsky';
      user.email = 'sapolsky@stanford.edu';
      user.password = 'robert123456';
      user.dateCreated = Date.now();
      user.playlists = ["Hello", 234, Date.now()];

      var currentDate = Date.now();
      user.save(function(err, saved){
        should.exist(err);
        done();
      });
    });

    // it('should encrypt the password', function(done){
    //   var user = new User();
    //   var password = 'robert123456';
    //   user.userName = 'rob';
    //   user.firstName = 'Robert';
    //   user.lastName = 'Sapolsky';
    //   user.email = 'sapolsky@stanford.edu';
    //   user.password = password;
    //   user.dateCreated = Date.now();
    //   user.playlists = [new Playlist({
    //     name: "oldies"
    //   })];

    //   user.save(function(err, saved){
    //     should.not.exist(err, 'No error should occur');
    //     saved.password.should.not.equal(password);
    //     saved.isValidPassword(password, function(err, isValid){
    //        should.not.exist(err, 'No error should occur');
    //        isValid.should.equal(true);
    //        done();
    //     });
    //   });
    // });
  });
});