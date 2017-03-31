'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var utils = require('../utils');
var freelancers;
var freelancer_testing;

describe('Backend search tests', function(){

  describe('GET /search', function(){

    before(seed);
    after(utils.dropDb);

    it('should list all freelancers profiles matching the search criteria: profession', function(done) {

      freelancer_testing = {
        "firstName"           : "Luca",
        "lastName"            : "Bernasconi",
        "address"             : "Via coihsaoidf",
        "description"         : "Description",
        "profession"          : "Painter",
        "category"            : "Other",
        "rating"              : 3,
        "email"               : "ciao@yahoo.com",
        "phone_number"        : "+41 4442323223",
        "location"            : "Bellinzona",
        "price"               : 300,
        "image"               : "/src/images/blank-user.jpg",
        "reviews"             : "[{\"rating\" : 3, \"comment\": \"bravissimo\"}]"
      };

      request(app)
      .get('/search/?profession=Painter')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(200)
      .end(function(err, res){
        freelancers.forEach(function(freelancer) {
          utils.matchProfessionInText(res.text, freelancer_testing);
        });
        done();
      });
    });

    it('should list all freelancers profiles matching the search criteria: location', function(done) {

      request(app)
      .get('/search/?profession=&location=Bellinzona')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(200)
      .end(function(err, res){
        freelancers.forEach(function(freelancer) {
          utils.matchLocationInText(res.text, freelancer_testing);
        });
        done();
      });
    });
  });

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
