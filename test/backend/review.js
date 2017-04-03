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

describe('Backend review tests', function(){

  describe('POST /:freelancerid/review', function(){

    before(seed);
    after(utils.dropDb);

    // it('should post a new review to the freelancer profile', function(done) {
    //   console.log(reviews[0]);
    //
    //   request(app)
    //   .post('/freelancer/' + freelancers[0]._id.toString() + '/review')
    //   .send(reviews[0])
    //   .expect(200)
    //   .end(function(err, res){
    //     // var body = res.body;
    //     // body.should.be.empty;
    //
    //     if(err) console.log(err);
    //
    //     res.body.should.have.property('reviews');
    //     res.body.reviews.should.have.property(reviews[0]);
    //     done()
    //
    //     //check if freelancer reviews were updated
    //     // request(app)
    //     // .get('/freelancer/' + freelancers[0]._id.toString())
    //     // .set('Accept', 'application/json')
    //     // .expect('Content-Type', /json/, 'it should respond with json' )
    //     // .expect(200)
    //     // .end(function(err, res){
    //     //   var resText = res.text;
    //     //   utils.matchFreelancerReview(res.text, JSON.stringify(reviews[0]));
    //     //   done();
    //     // });
    //   });
    //
    // });

    it('should give back a 404 status if the review is posted to a freelancer profile that does not exists', function(done) {
      request(app)
      .put('/freelancer/' + freelancers[0]._id.toString() + '/review')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(reviews[0])
      .expect(204)
      .end(function(err, res){
        var body = res.body;
        body.should.be.empty;

        request(app)
        .get('/freelancer/' + ObjectId().toString())
        .set('Accept', 'application/json')
        .expect(404, done);
      });
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
