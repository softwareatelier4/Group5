'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var utils = require('../utils');
var freelancers;
var users;
var notifications;
var Notification = mongoose.model('Notification');

describe('Backend notification router tests', function(){

  describe('GET /notification/:id/:subject', function(){
    before(seed);
    after(utils.dropDb);

    it('should list the freelancer notifications matching the id', function(done) {

      request(app)
      .get('/notification/' + freelancers[10]._id.toString() +"/freelancer")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(200, done);
      done();
    });

    it('should list the freelancer notifications matching the id', function(done) {

      request(app)
      .get('/notification/' + freelancers[1]._id.toString() +"/freelancer")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(200, done);
    });

    it('should give back a 400 status if the freelancer profile does not exists', function(done) {

      request(app)
      .get('/notification/' + ObjectId().toString() + "/freelancer")
      .set('Accept', 'application/json')
      .expect(400, done);
    });

    it('should give back a 400 status if the url contains user', function(done) {

      request(app)
      .get('/notification/' + freelancers[10]._id.toString() + "/user")
      .set('Accept', 'application/json')
      .expect(400, done);
    });

    it('should list the user notifications matching the id', function(done) {

      request(app)
      .get('/notification/' + users[2]._id.toString() +"/user")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(200, done);
    });

    it('should list the user notifications matching the id', function(done) {

      request(app)
      .get('/notification/' + users[3]._id.toString() +"/user")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(200, done);
    });

    it('should give back a 400 status if the user profile does not exists', function(done) {

      request(app)
      .get('/notification/' + ObjectId().toString() + "/user")
      .set('Accept', 'application/json')
      .expect(400, done);
    });

    it('should give back a 400 status if the url contains freelancer', function(done) {

      request(app)
      .get('/notification/' + users[2]._id.toString() + "/freelancer")
      .set('Accept', 'application/json')
      .expect(400, done);
    });
  });



  describe('PUT /emergency/:id/:subject/:answer', function(){
    before(seed);
    after(utils.dropDb);

    it('should accept the user yes to contact next freelancer', function(done) {

      request(app)
      .put('/emergency/' + notifications[0]._id +"/user/yes")
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(204, done);
    });

    it('should accept the user yes to contact next freelancer but no more freelancers', function(done) {

      request(app)
      .put('/emergency/' + notifications[0]._id.toString() +"/user/yes")
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(204, done); //modify in router 204 to 200
    });

    it('should accept the user no to contact next freelancer', function(done) {

      request(app)
      .put('/emergency/' + notifications[0]._id.toString() +"/user/no")
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(204, done); //modify in router 204 to 200
    });

    it('should return 200 if the user say no to contact next freelancer but notification id is wrong', function(done) {

      request(app)
      .put('/emergency/' + ObjectId().toString() +"/user/no")
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200, done);//modify in router 400 to 404
      done();
    });



    it('should accept the freelancer no to emergency call', function(done) {

      request(app)
      .put('/emergency/' + notifications[0]._id.toString() +"/freelancer/no")
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(204, done);
      done();
    });

    it('should accept the freelancer yes to emergency call', function(done) {
      request(app)
      .put('/emergency/' + notifications[0]._id.toString() +"/freelancer/yes")
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(204, done);
      done();
    });

    it('should do nothing if notification does not exists', function(done) {

      request(app)
      .put('/emergency/' + ObjectId().toString() +"/user/yes")
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200, done); //modify in router 204 to 200
      done();
    });
  });


});


describe('Backend emergency router tests', function(){

  describe('POST /emergency', function(){
    before(seed);
    after(utils.dropDb);

    it('should return nothing if no profiles are found', function(done) {
      var freelancerQuery = {
        profession: 'rapper',
        category: 'Other'
      };

      request(app)
      .post('/emergency')
      .set('Accept', 'application/json')
      .send(freelancerQuery)
      .expect(201, done); //modify in router 201 to 200, line 122
    });

    it('should return nothing if no free profiles with events are found', function(done) {

      var freelancerQuery = {
        profession: 'Warehouseman',
        category: 'Logistics'
      };

      request(app)
      .post('/emergency')
      .send(freelancerQuery)
      .expect(200, done);
    });

    it('should return nothing if no available free profiles is found', function(done) {

      var freelancerQuery = {
        location: 'Lugano',
        profession: 'Software Engineer',
        category: 'IT Services'
      };

      request(app)
      .post('/emergency')
      .set('Accept', 'application/json')
      .send(freelancerQuery)
      .expect(200, done);
    });

    it('should return 201 if an available free freelancer is found', function(done) {

      var freelancerQuery = {
        location: 'Lugano',
        description: 'Need and emergency painter',
        profession: 'painter',
        category: 'Other',
        userId: "5625fc2bd82b84d23d8c9bd0"
      };

      request(app)
      .post('/emergency')
      .set('Accept', 'application/json')
      .set('Cookie', ['JSESSIONID.780df5a9=2r9vgn3hs685184zonfresfc5; connect.sid=s%3AHGEN-glMZnOqv-6ZrXnodVEvLQD3b5DU.RI3bOqufZYRcUVyZTAIpGxBeu1BNaQat6xt7QdurkBY; io=mT6gVyXMeHODmPl6AAAB; session=eyJ1c2VyIjp7Il9pZCI6IjU2MjVmYzJiZDgyYjg0ZDIzZDhjOWJkMCIsInVzZXJOYW1lIjoiZmlzY2hlciIsImZpcnN0TmFtZSI6IiIsImxhc3ROYW1lIjoiIiwicGFzc3dvcmQiOiJmaXNjaGVyIiwiZW1haWwiOiJmaXNjaGVyQG1lLmNoIiwiZnJlZWxhbmNlcklkIjoiNTYyNWZjMmJkODJiODRkMjNkOGM3YmQ2IiwiX192IjowLCJub3RpZmljYXRpb25zIjpbIjU5MGYyYmNmZGEwZjI1NWZkOWZiNTY1NCJdLCJ1c2VyVHlwZSI6IkZyZWVsYW5jZXIifX0=; session.sig=pH_MUgfNixmCEyYH0m-8B_ScEn0'])
      .send(freelancerQuery)
      .expect(201, done);
    });

    it('should return 400 if userId is not provided in body', function(done) {

      var freelancerQuery = {
        location: 'Lugano',
        description: 'Need and emergency painter',
        profession: 'painter',
        category: 'Other'
      };

      request(app)
      .post('/emergency')
      .set('Accept', 'application/json')
      .set('Cookie', ['JSESSIONID.780df5a9=2r9vgn3hs685184zonfresfc5; connect.sid=s%3AHGEN-glMZnOqv-6ZrXnodVEvLQD3b5DU.RI3bOqufZYRcUVyZTAIpGxBeu1BNaQat6xt7QdurkBY; io=mT6gVyXMeHODmPl6AAAB; session=eyJ1c2VyIjp7Il9fdiI6MCwiZW1haWwiOiJkZWV6QG51dHouY29tIiwidXNlck5hbWUiOiJ0aGlzIiwicGFzc3dvcmQiOiJ0aGlzIiwiX2lkIjoiNTkwODViZWJjMTEwMmMxOTc0ZmVlM2JiIiwidXNlclR5cGUiOiJOb3JtYWwifX0=; session.sig=C0s5TC0WKPbx0CMBuTSWUxVgbpg'])
      .send(freelancerQuery)
      .expect(400, done);
    });


  });

});


function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    freelancers = seedData[0].data;
    users = seedData[1].data;
    notifications = seedData[4].data;
    done();
  });
}
