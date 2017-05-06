'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var should = require('should');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var utils = require('../utils');
var users;

describe('Backend login and signup', function () {

  describe('POST /login', function () {
    before(seed);
    after(utils.dropDb);

    it('should return 404 status because the user does not exists', function(done) {

      request(app)
      .post('/login')
      .send({
        userName : 'cama',
        password : 'camo'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(404, done)

    });

    it('should return 401 status because the password is not correct', function(done) {

      request(app)
      .post('/login')
      .send({
        userName : 'camo',
        password : 'cama'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(401, done)
    });

    it('should return 200 status as the credentials matches', function (done) {

      request(app)
        .post('/login')
        .send(users[0])
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json')
        .expect(200)
        .end(function (err, res) {
          res = JSON.parse(res.text);

          should.not.exist(err, 'No error should occur');
        });
      done();
    });
  });

  describe('POST /signup', function () {

    before(seed);
    after(utils.dropDb);
    it('should return 400 status because the user already exists', function (done) {

      request(app)
      .post('/login/signup')
      .set('Accept', 'application/json')
      .send(users[1])
      .expect(400, done)
    });

    it('should return 200 status as the user does not exists', function (done) {

      request(app)
        .post('/login/signup')
        .send({
          "userName": "gianni",
          "firstName": "",
          "lastName": "",
          "password": "gianni",
          "email": "gianni@me.ch",
          "userType": "Normal"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json')
        .expect(200)
        .end(function (err, res) {
          res = JSON.parse(res.text);

          should.exist(err, 'No error should occur');
        });
      done();
    });
  });

});

// ///////////////////////////////////////// ///////////////////////////////////////


  describe('GET /login', function () {

    before(seed);
    after(utils.dropDb);
    it('should return user data', function (done) {

      request(app)
        .get('/login/2625fc2bd89b84023d8c7bd6')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json')
        .expect(200)
        .end(function (err, res) {
                    let response = JSON.parse(res.text);
                    utils.matchUserNameInText("camo", response.user);
                    done();
                });

    });

    it('should return 200 status as the user does not exists', function (done) {

      request(app)
        .post('/login/signup')
        .send({
          "userName": "gianni",
          "firstName": "",
          "lastName": "",
          "password": "gianni",
          "email": "gianni@me.ch",
          "userType": "Normal"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json')
        .expect(200)
        .end(function (err, res) {
          res = JSON.parse(res.text);

          should.exist(err, 'No error should occur');
        });
      done();
    });
  });



function seed(done) {
  //seed the db
  seedDb.seed(function (err, seedData) {
    if (err) return done(err);
    users = seedData[1].data;
    done();
  });
}