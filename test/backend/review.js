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
      // done();
    });

    it('should give back a 400 status if the review is posted to a freelancer profile that does not exists', function(done) {
      request(app)
      .post('/freelancer/' + '2625fc2bd82b84d23d8c7bd6' + '/review')
      .set('Accept', 'application/json')
      .send({
        "_id"                 : ObjectId("2625fc2bd82b84d23d8c7bd6"),
        "date"                : date,
        "comment"             : "nice job",
        "rating"              : 5,
        "userName"            : "goodguy27"})
        .expect(400)
        .end(function(err, res){
          res = JSON.parse(res.text);
          console.log(err);
          should.not.exist(err, 'No error should occur');
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
    reviews = seedData[2].data;
    done();
  });
}
