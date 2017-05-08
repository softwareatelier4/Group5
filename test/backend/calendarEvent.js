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
      .set('Accept', 'application/json')
      .send({
        start : new Date(),
        end   : new Date(),
        location   : "asd",
        description   : "asd",

      })
      .expect(200, done);
    });

    it('should give back a 404 status if the event is posted to a freelancer profile that does not exists', function(done) {
      request(app)
      .post('/freelancer/' + '2625fc2bd82b84d23d8c7bd6' + '/event')
      .set('Accept', 'application/json')
      .send({
        start : new Date(),
        end   : new Date(),
        location   : "asd",
        description   : "asd",

      })
        .expect(404, done)
      });
  });

  describe('DELETE /:freelancerid/event/:eventid', function(){

    before(seed);
    after(utils.dropDb);

    it('should delete an event from to the freelancer profile', function(done) {
      request(app)
      .delete('/freelancer/' + freelancers[0]._id.toString() + '/event/' + events[1]._id.toString())
      .set('Accept', 'application/json')
      .expect(200, done);
    });

    it('should give 404 if the freelancer profile does not exists', function(done) {
      request(app)
      .delete('/freelancer/' + '2625fc2bd82b84d23d8c7bd6' + '/event/' + events[1]._id.toString())
      .set('Accept', 'application/json')
      .expect(404, done);
    });

    it('should give 404 if the event does not exists', function(done) {
      request(app)
      .delete('/freelancer/' + freelancers[0]._id.toString() + '/event/' + "2625fc2bd82b84d23d8c7bd6")
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
    events = seedData[3].data;
    done();
  });
}
