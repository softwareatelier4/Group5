'use strict';

//connect to DB
var mongoose   = require('mongoose');

var should = require('should');
var utils =  require('./utils');

//load model
require('../models/Freelancer');

describe('Ex1: Freelancer Model', function(done){

  describe('Freelancer model definition', function(){
    it('should have a constructor', function(){
      var Freelancer;
      try{
        Freelancer = mongoose.model('Freelancer');
      }catch(err){
        console.log(err.stack);
      }finally{
        should.exist(Freelancer, 'expected Freelancer constructor to exist');
        Freelancer.should.be.a.Function;
      }
    })
  });

  describe('When creating a new freelancer', function(done){
    var Freelancer = mongoose.model('Freelancer');

    before(function(done){
      //connect and drop db
      utils.connectAndDropDb(function(err){
        if (err) return done(err);
        done()
      });
    });

    after(utils.dropDbAndCloseConnection);

    it('should create an instance of the right type', function(){
      var freelancer = new Freelancer();
      freelancer.constructor.name.should.equal('model');
      freelancer.should.be.instanceof(Freelancer);
    });

    it('should persist a freelancer with valid properties', function(done){
      var freelancer = new Freelancer();
      freelancer.firstName = 'Mark Knopfler';
      freelancer.lastName = 'Rock, roots rock, Celtic rock, blues-rock';
      freelancer.address = 'sasgfkb';
      freelancer.email = 'askhb@as.askug';
      freelancer.phone_number = '19821';
      freelancer.location = 'tua mamma';
      freelancer.profession = 'coglione';
      freelancer.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(freelancer);
        done();
      });
    });

    it('should fail if firstName is empty, null, or undefined', function(done){
      var freelancer = new Freelancer();
      freelancer.lastName = 'Rock, roots rock, Celtic rock, blues-rock';
      freelancer.address = 'sasgfkb';
      freelancer.email = 'askhb@as.askug';
      freelancer.phone_number = '19821';
      freelancer.location = 'tua mamma';
      freelancer.profession = 'coglione';
      utils.errorIfNullUndefinedOrEmpty(freelancer, 'firstName', done );
    });

    it('if profession is empty; null; or undefined, it should get assigned the value `Other`',
      function(done){
      var freelancer = new Freelancer();
      freelancer.firstName = 'Mark Knopfler';
      freelancer.lastName = 'Rock, roots rock, Celtic rock, blues-rock';
      freelancer.address = 'sasgfkb';
      freelancer.email = 'askhb@as.askug';
      freelancer.phone_number = '19821';
      freelancer.location = 'tua mamma';
      freelancer.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        freelancer.profession.should.equal('Other');
        done();
      });
    });
  });
});
