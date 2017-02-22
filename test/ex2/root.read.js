'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var resources = ["/albums", "/artists", "tracks", "/users"]

describe('Ex2: Testing Read for / routes', function(){

  describe('GET /', function(){

    it('should list all links when Accept is application/json', function(done){
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .end(function(err, res){
          var resText = res.text;
          resources.forEach(function(resource){
            resText.indexOf(resource).should.be.greaterThan(-1, resource + " should be there");
          });
          done();
        });
    });

    it('should render index.dust with all links when Accept is text/html', function(done){
      request(app)
        .get('/')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/, 'it should respond with html' )
        .expect(200)
        .end(function(err, res){
          var resText = res.text;
          resources.forEach(function(resource){
            resText.indexOf(resource).should.be.greaterThan(-1, resource + " should be there");
          });
          resText.indexOf("<link rel='stylesheet' href='/css/style.css' />").should.be.greaterThan(-1, "link statement should be there");
          resText.indexOf('class="link"').should.be.greaterThan(-1, "class list should be there");
          done();
        });
    });
  });
});
