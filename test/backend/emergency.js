'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var utils = require('../utils');
var freelancers;

// describe('Backend emergency tests', function(){
//
//   describe('GET /notification/:id/:subject', function(){
//     before(seed);
//     after(utils.dropDb);
//
//     it('should list the freelancer notifications matching the id', function(done) {
//
//       request(app)
//       .get('/notification/' + freelancers[0]._id.toString() +"/freelancer")
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/, 'it should respond with json')
//       .expect(200)
//       .end(function(err, res){
//         utils.matchFreelancerIdInText(res.text, freelancers[0]);
//       });
//       done();
//     });
//
//     it('should give back a 400 status if the freelancer profile does not exists', function(done) {
//
//       request(app)
//       .get('/notification/' + ObjectId().toString() + "/freelancer")
//       .set('Accept', 'application/json')
//       .expect(4040, done);
//     });
//
//     it('should give back a 400 status if the url contains user', function(done) {
//
//       request(app)
//       .get('/notification/' + freelancers[0]._id.toString() + "/user")
//       .set('Accept', 'application/json')
//       .expect(4040, done);
//     });
//
//
//
//     it('should list the user notifications matching the id', function(done) {
//
//       request(app)
//       .get('/notification/' + users[0]._id.toString() +"/freelancer")
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/, 'it should respond with json')
//       .expect(200)
//       .end(function(err, res){
//         utils.matchFreelancerIdInText(res.text, users[0]);
//       });
//       done();
//     });
//
//     it('should give back a 400 status if the user profile does not exists', function(done) {
//
//       request(app)
//       .get('/notification/' + ObjectId().toString() + "/user")
//       .set('Accept', 'application/json')
//       .expect(400, done);
//     });
//
//     it('should give back a 400 status if the url contains freelancer', function(done) {
//
//       request(app)
//       .get('/notification/' + users[0]._id.toString() + "/freelancer")
//       .set('Accept', 'application/json')
//       .expect(400, done);
//     });
//   });
//
//
//
//
//   it('should accept the user yes to contact next freelancer', function(done) {
//
//     request(app)
//     .get('/emergency/' + notifications[0]._id.toString() +"/user/yes")
//     .set('Accept', 'application/json')
//     .expect(204, done);
//     done();
//   });
//
//   it('should accept the user yes to contact next freelancer but no more freelancers', function(done) {
//
//     request(app)
//     .get('/emergency/' + notifications[0]._id.toString() +"/user/yes")
//     .set('Accept', 'application/json')
//     .expect(204, done);
//     done();
//   });
//
//   it('should accept the user no to contact next freelancer', function(done) {
//
//     request(app)
//     .get('/emergency/' + notifications[0]._id.toString() +"/user/no")
//     .set('Accept', 'application/json')
//     .expect(204, done);
//     done();
//   });
//
//   it('should return 400 if the user say no to contact next freelancer but notification id is wrong', function(done) {
//
//     request(app)
//     .get('/emergency/' + ObjectId()._id.toString() +"/user/yes")
//     .set('Accept', 'application/json')
//     .expect(400, done);
//     done();
//   });
//
//
//
//   it('should accept the freelancer no to emergency call', function(done) {
//
//     request(app)
//     .get('/emergency/' + notifications[0]._id.toString() +"/freelancer/no")
//     .set('Accept', 'application/json')
//     .expect(204, done);
//     done();
//   });
//
//   it('should accept the freelancer yes to emergency call', function(done) {
//
//     request(app)
//     .get('/emergency/' + notifications[0]._id.toString() +"/freelancer/yes")
//     .set('Accept', 'application/json')
//     .expect(204, done);
//     done();
//   });
//
//
//
// });


function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    freelancers = seedData[0].data;
    done();
  });
}
