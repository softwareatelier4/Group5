'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var should = require('should');
var app = require('../../app');
var seedDb = require('../seedDb');
var request = require('supertest');
var utils = require('../utils');
var freelancers;

describe('Backend get all profiles with verification : pending', function () {

    describe('GET /admin/', function () {
        before(seed);
        after(utils.dropDb);

        it('should list all freelancer profiled that have verification pending', function (done) {

            request(app)
                .get('/admin/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/, 'it should respond with json')
                .expect(200)
                .end(function (err, res) {
                    let pendingFreelancers = JSON.parse(res.text);
                    pendingFreelancers.forEach(function (freelancer) {
                        //   console.log(freelancer);
                        utils.matchFreelancerPendingInText("pending", freelancer);
                    });
                    done();
                });
        });

        // I don't know how to do the 404 because it is 404 only if there are non pending in the database but they are there.

        // it('should give back a 404 status if there are no pending profiles', function(done) {

        //   request(app)
        //   .get('/admin/')
        //   .set('Accept', 'application/json')
        //   .expect(404, done);
        // });
    });
});

describe('Backend update verification of a freelancer', function () {

    describe('PUT /admin/', function () {
        before(seed);
        after(utils.dropDb);

        // it('should cheange the verificataion of a freelancer, his id and what it should be set to are given in the request', function (done) {

        //     request(app)
        //         .put('/admin/')
        //         .set('Accept', 'application/json')
        //         .expect('Content-Type', /json/, 'it should respond with json')
        //         .expect(200)
        //         .end(function (err, res) {
        //             done();
        //         });
        // });

        // I don't know how to do the 404 because it is 404 only if there are non pending in the database but they are there.

        // it('should give back a 404 status if there are no pending profiles', function(done) {

        //   request(app)
        //   .put('/admin/')
        //   .set('Accept', 'application/json')
        //   .expect(404, done);
        // });
    });
});


function seed(done) {
    //seed the db
    seedDb.seed(function (err, seedData) {
        if (err) return done(err);
        freelancers = seedData[0].data;
        done();
    });
}