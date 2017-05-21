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

  describe('PUT /freelancer/:freelancerid', function(){
    before(seed);
    after(utils.dropDb);

    it('should update the freelancer profile container info', function(done) {

      var update = { leftFields: 3, fieldsOrder: ["5", "6", "10", "11", "12", "7", "8", "2", "3", "4", "9", "13", "1"] }

      request(app)
      .put('/freelancer/' + freelancers[0]._id.toString())
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(update)
      .expect(200, done);
    });
  });

  describe('POST /freelancer/:freelancerid', function(){
    before(seed);
    after(utils.dropDb);

    it('post freelancers test', function(done) {

      request(app)
      .post('/freelancer/' + 1)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200, done);
    });

    it('post freelancers test', function(done) {

      request(app)
      .post('/freelancer/' + 0)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200, done);
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
