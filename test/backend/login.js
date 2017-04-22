'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var utils = require('../utils');
var users;

describe('Backend login and signup', function(){

  describe('POST /login', function(){
    before(seed);
    after(utils.dropDb);

    it('should return 400 status because the user does not exists', function(done) {

      request(app)
      .post('/login')
      .send({
        userName : 'cama',
        password : 'camo'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(400, done)

    });

    it('should return 400 status because the password is not correct', function(done) {

      request(app)
      .post('/login')
      .send({
        userName : 'camo',
        password : 'cama'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(400, done)
    });

    it('should return 200 status as the credentials matches', function(done) {

      request(app)
      .post('/login')
      .send(users[0])
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, 'it should respond with json')
      .expect(200)
      .end(function(err, res){
        res = JSON.parse(res.text);

					should.not.exist(err, 'No error should occur');
      });
      done();
    });

    it('should give back a 404 status if the freelancer profile does not exists', function(done) {

      request(app)
      .get('/freelancer/' + ObjectId().toString())
      .set('Accept', 'application/json')
      .expect(404, done);
    });
  });
});


function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    users = seedData[1].data;
    done();
  });
}
