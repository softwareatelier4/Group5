'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var utils = require('../utils');
var freelancers;

describe('Backend search tests', function(){

  describe('GET /search', function(){

    before(seed);
    after(utils.dropDb);

    it('should list all freelancers profiles matching the search criteria in any field', function(done) {

      request(app)
      .get('/search/?general=painter&category=')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(200)
      .end(function(err, res){
        freelancers.forEach(function(freelancer) {
          utils.matchProfessionInText(res.text, freelancers[0]);
        });
        done();
      });
    });

    it('should list all freelancers profiles matching the search criteria in any field and the category researched', function(done) {

      request(app)
      .get('/search/?general=mario&category=Other')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(200)
      .end(function(err, res){
        freelancers.forEach(function(freelancer) {
          utils.matchProfessionInText(res.text, freelancers[0]);
        });
        done();
      });
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
