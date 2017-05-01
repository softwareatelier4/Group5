'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var utils = require('../utils');
var freelancers;
var events;
var date = new Date();

describe('Backend events tests', function(){

  describe('POST /:freelancerid/event', function(){

    before(seed);
    after(utils.dropDb);

    it('should post a new event to the freelancer profile', function(done) {
      request(app)
      .post('/freelancer/' + freelancers[0]._id.toString() + '/event')
      .send(events[0].data)
      .expect(200, done);
      // done();
    });

    it('should give back a 400 status if the events is posted to a freelancer profile that does not exists', function(done) {
      request(app)
      .post('/freelancer/' + '2625fc2bd82b84d23d8c7bd6' + '/event')
      .set('Accept', 'application/json')
      .send(events[0].data)
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
    events = seedData[3].data;
    done();
  });
}
