'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var utils = require('../utils');
var freelancers;
var reviews;
var date = new Date();

describe('Backend review tests', function(){

  describe('POST /:freelancerid/review', function(){

    before(seed);
    after(utils.dropDb);

    it('should post a new review to the freelancer profile', function(done) {
      request(app)
      .post('/freelancer/' + freelancers[0]._id.toString() + '/review')
      .send({
        "_id"                 : ObjectId("1625fc2bd82b84d23d8c7bd6"),
        "date"                : date,
        "comment"             : "nice job",
        "rating"              : 5,
        "userName"            : "goodguy27"})
      .expect(200, done);
    });

    it('should give back a 404 status if the review is posted to a freelancer profile that does not exists', function(done) {
      request(app)
      .post('/freelancer/' + '2625fc2bd82b84d23d8c7bd6' + '/review')
      .set('Accept', 'application/json')
      .send({
        "_id"                 : ObjectId("2625fc2bd82b84d23d8c7bd6"),
        "date"                : date,
        "comment"             : "nice job",
        "rating"              : 5,
        "userName"            : "goodguy27"})
        .expect(404, done);
      });
  });


  describe('POST /:freelancerid/review/:reviewid', function(){

    before(seed);
    after(utils.dropDb);

    it('should post a new response to the review in the freelancer profile', function(done) {
      request(app)
      .post('/freelancer/' + freelancers[0]._id.toString() + '/review/' + reviews[5]._id.toString())
      .set('Accept', 'application/json')
      .send({
        "_id"                 : ObjectId("1625fc2bd82b84d23d8c7bd6"),
        "date"                : date,
        "comment"             : "thanks for your feedback"})
      .expect(200, done);
    });


      it('should not post a new response to the review in the freelancer profile if the review is not present', function(done) {
        request(app)
        .post('/freelancer/' + freelancers[0]._id.toString() + '/review/1125fc2bd82b84d23d8c7bd6')
        .set('Accept', 'application/json')
        .send({
          "_id"                 : ObjectId("1125fc2bd82b84d23d8c7bd6"),
          "date"                : date,
          "comment"             : "thanks for your feedback"})
        .expect(404, done);
      });
  });

});


function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    freelancers = seedData[0].data;
    reviews = seedData[2].data;
    done();
  });
}
