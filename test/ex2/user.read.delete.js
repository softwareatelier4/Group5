'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var utils =  require('../utils');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var users;

describe('Ex2: Testing Read and Delete for /users routes', function(){

  describe('GET /users', function(){

    before(seed);
    after(utils.dropDb);

    it('should list all the users with correct data', function(done){
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resText = res.text;
          users.forEach(function(user){
            utils.matchUserInfoInText(res.text, user);
          });
          done();
        });
    });
  });

  describe('GET /users/:userid', function(){

    before(seed);
    after(utils.dropDb);

    it('should list the user with correct data', function(done){
      request(app)
        .get('/users/' + users[1]._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resText = res.text;
          utils.matchUserInfoInText(res.text, users[1]);
          done();
        });
    });

    it('should respond with a 404 if the user does not exist', function(done){
      request(app)
        .get('/users/' + ObjectId().toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

  describe('DELETE /users/:userid', function(){

    before(seed);
    after(utils.dropDb);

    it('should delete an existing user', function(done){
      request(app)
        .del('/users/' + users[1]._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(204)
        .end(function(err, res){
          res.text.should.be.empty;
          res.body.should.be.empty;
          done();
        });
    });

    it('should not list the previous resource', function(done){
      request(app)
        .get('/users/' + users[1]._id.toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should respond with a 404 for a previously deleted resource', function(done){
      request(app)
        .delete('/users/' + users[1]._id.toString())
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should respond with a 404 if the user does not exist', function(done){
      request(app)
        .delete('/users/' + ObjectId().toString())
        .set('Accept', 'application/json')
        .expect(404, done);
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

