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
var test_date;
var review_test;

describe('Backend review tests', function(){

  describe('POST /:freelancerid/review', function(){

    before(seed);
    after(utils.dropDb);

    it('should post a new review to the freelancer profile', function(done) {

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

      test_date = new Date();

      review_test = {
        "date"                : test_date,
        "comment"             : "che bel lavoro",
        "rating"              : 5

      }

      request(app)
      .post('/freelancer/' + freelancers[0]._id.toString() + '/review')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(review_test)
      .expect(204)
      .end(function(err, res){
        var body = res.body;
        body.should.be.empty;

        //check if freelacner reviews were updated
        request(app)
        .get('/freelancer/' + freelancers[0]._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resText = res.text;
          utils.matchFreelancerReview(res.text, review_test);
          done();
        });
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
