'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var utils =  require('../utils');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var users;

describe('Ex2: Testing Create and Update on /users routes', function(){

  describe('POST /users', function(){

    before(seed);
    after(utils.dropDb);

    it('should create a new user if the data is valid', function(done){
      var newUserData =  {
        "firstName" : "Seth",
        "lastName" : "MacFarlane",
        "userName" : "seth",
        "email" : "seth.macfarlane@gmail.com",
        "password" : "peg" 
      };

      request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newUserData)
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(201)
        .end(function(err, res){
          var resText = res.text;
          users.forEach(function(user){
            utils.matchUserInfoInText(res.text, newUserData);
          });
          done();
        });
    });

    it('should get a 400 Bad Request if data is invalid #1', function(done){
      var newUserData =  {
        "firstName" : "Seth" 
      };

      request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newUserData)
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(400, done);
    });

    it('should get a 400 Bad Request if data is invalid #2', function(done){
      var newUserData =  {
        "userName" : "seth",
        "email" : "seth.macfarlane@gmail.com",
      };

      request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newUserData)
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(400, done);
    });
  });

  describe('PUT /users/:userid', function(){
    before(seed);

    it('should update an existing user', function(done){
      var newUserData =  {
        "firstName" : "Seth",
        "lastName" : "MacFarlane",
        "userName" : "seth",
        "email" : "hello",
        "password" : "peg" 
      };

      request(app)
        .put('/users/' + users[0]._id.toString())
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newUserData)
        .expect(204)
        .end(function(err, res){
          var body = res.body;
          body.should.be.empty;

          //check if user was updated
          request(app)
            .get('/users/' + users[0]._id.toString())
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/, 'it should respond with json' )
            .expect(200)
            .end(function(err, res){
              var resText = res.text;
              utils.matchUserInfoInText(res.text, newUserData);
              done();
            });

        });
    });

    it('should create a new user if the user does not exist', function(done){
      var newUserData =  {
        "firstName" : "Seth",
        "lastName" : "MacFarlane",
        "userName" : "seth",
        "email" : "hello",
        "password" : "peg" 
      };

      var obId = ObjectId();

      request(app)
        .put('/users/' +obId)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newUserData)
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(201)
        .end(function(err, res){
          utils.matchUserInfoInText(res.text, newUserData);

          //check if user was created
          request(app)
            .get('/users/' + obId)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/, 'it should respond with json' )
            .expect(200)
            .end(function(err, res){
              var resText = res.text;
              utils.matchUserInfoInText(res.text, newUserData);
              done();
            });

        });
    });

    it('should get a 400 Bad Request if data is invalid', function(done){
      var newUserData =  {
        "firstName" : "Seth",
        "email" : "hello",
        "password" : "peg" 
      };

      request(app)
        .put('/users/' + users[0]._id.toString())
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(newUserData)
        .expect(400, done)
    });
  });
});

function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);
    users = seedData[3].data;
    done();
  });
}
