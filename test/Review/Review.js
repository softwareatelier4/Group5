'use strict';

//connect to DB
var mongoose   = require('mongoose');

var should = require('should');
var utils =  require('../utils');

//load model
require('../../models/Review');

describe('Review Model', function(done){

  describe('Review model definition', function(){
    it('should have a constructor', function(){
      var Review;
      try{
        Review = mongoose.model('Review');
      }catch(err){
        console.log(err.stack);
      }finally{
        should.exist(Review, 'expected Review constructor to exist');
        Review.should.be.a.Function;
      }
    })
  });

  describe('When creating a new review', function(done){
    var Review = mongoose.model('Review');

    before(function(done){
      //connect and drop db
      utils.connectAndDropDb(function(err){
        if (err) return done(err);
        done()
      });
    });

    after(utils.dropDbAndCloseConnection);

    it('should create an instance of the right type', function(){
      var review = new Review();
      review.constructor.name.should.equal('model');
      review.should.be.instanceof(Review);
    });

    it('should persist a review with valid properties', function(done){
      var review = new Review();
      review.rating = 3;
      review.comment = 'Dire Straits';
      review.date = Date.now();
      review.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(review);
        done();
      });
    });

    it('should fail if rating is empty', function(done){
      var review = new Review();
      review.rating = '';
      review.comment = 'Bubu';
      review.date = Date.now();
      utils.errorIfNullUndefinedOrEmpty(review, 'rating', done );
    });

    it('should fail if rating is null', function(done){
      var review = new Review();
      review.rating = null;
      review.address = 'sasgfkb';
      review.email = 'askhb@as.askug';
      utils.errorIfNullUndefinedOrEmpty(review, 'rating', done );
    });

    it('should fail if rating is undefined', function(done){
      var review = new Review();
      review.rating = undefined;
      review.comment = 'Bubu';
      review.date = Date.now();
      utils.errorIfNullUndefinedOrEmpty(review, 'rating', done );
    });

    it('should pass if date is empty, ', function(done){
      var review = new Review();
      review.rating = 4;
      review.comment = 'Bubu';
      review.date = '';
      review.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(review);
        done();
      });
    });

    it('should pass if date is null', function(done){
      var review = new Review();
      review.rating = 4;
      review.comment = 'Bubu';
      review.date = null;
      review.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(review);
        done();
      });
    });

    it('should pass if date is undefined', function(done){
      var review = new Review();
      review.rating = 4;
      review.comment = 'Bubu';
      review.date = undefined;
      review.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(review);
        done();
      });
    });

  });
});
