'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var utils = require('../utils');
var freelancers;

describe('Backend freelancers tests', function(){

  describe('GET /freelancer/:freelancerid', function(){
    before(seed);
    after(utils.dropDb);

    it('should list the freelancer profile matching the id', function(done) {

      request(app)
      .get('/freelancer/' + freelancers[0]._id.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(200)
      .end(function(err, res){
        utils.matchFreelancerIdInText(res.text, freelancers[0]);
      });
      done();
    });

    it('should give back a 404 status if the freelancer profile does not exists', function(done) {

      request(app)
      .get('/freelancer/' + ObjectId().toString())
      .set('Accept', 'application/json')
      .expect(404, done);
    });
  });
});


function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    freelancers = seedData[0].data;
    done();
  });
}
