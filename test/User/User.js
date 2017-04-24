'use strict';

//connect to DB
var mongoose   = require('mongoose');

var should = require('should');
var utils =  require('../utils');

//load model
require('../../models/User');

describe('User Model', function(done){

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
    var User = mongoose.model('User');

    before(function(done){
      //connect and drop db
      utils.connectAndDropDb(function(err){
        if (err) return done(err);
        done()
      });
    });

    after(utils.dropDbAndCloseConnection);

    it('should create an instance of the right type', function(){
      var user = new User();
      user.constructor.name.should.equal('model');
      user.should.be.instanceof(User);
    });

    it('should persist a user with valid properties', function(done){
      var user = new User();
      user.userName = 'camo';
      user.firstName = 'Camillo';
      user.lastName = 'Malnati';
      user.password = 'camo';
      user.email = 'camo@me.ch';
      user.userType = 'Admin';
      user.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(user);
        done();
      });
    });

    it('should fail if username is empty, null, or undefined', function(done){
      var user = new User();
      user.userName = undefined;
      user.firstName = 'Camillo';
      user.lastName = 'Malnati';
      user.password = 'camo';
      user.email = 'camo@me.ch';
      user.userType = 'Admin';
      utils.errorIfNullUndefinedOrEmpty(user, 'userName', done );
    });

    it('should fail if email is empty, null, or undefined', function(done){
      var user = new User();
      user.userName = 'camo';
      user.firstName = 'Camillo';
      user.lastName = 'Malnati';
      user.password = 'camo';
      user.email = undefined;
      user.userType = 'Admin';
      utils.errorIfNullUndefinedOrEmpty(user, 'email', done );
    });

    it('should fail if password is empty, null, or undefined', function(done){
      var user = new User();
      user.userName = 'camo';
      user.firstName = 'Camillo';
      user.lastName = 'Malnati';
      user.password = undefined;
      user.email = 'camo@me.ch';
      user.userType = 'Admin';
      utils.errorIfNullUndefinedOrEmpty(user, 'password', done );
    });

  });
});
