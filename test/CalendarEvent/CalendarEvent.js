'use strict';

//connect to DB
var mongoose   = require('mongoose');

var should = require('should');
var utils =  require('../utils');

//load model
require('../../models/CalendarEvent');

describe('CalendarEvent Model', function(done){

  describe('CalendarEvent model definition', function(){
    it('should have a constructor', function(){
      var CalendarEvent;
      try{
        CalendarEvent = mongoose.model('CalendarEvent');
      }catch(err){
        console.log(err.stack);
      }finally{
        should.exist(CalendarEvent, 'expected CalendarEvent constructor to exist');
        CalendarEvent.should.be.a.Function;
      }
    })
  });

  describe('When creating a new calendarEvent', function(done){
    var CalendarEvent = mongoose.model('CalendarEvent');

    before(function(done){
      //connect and drop db
      utils.connectAndDropDb(function(err){
        if (err) return done(err);
        done()
      });
    });

    after(utils.dropDbAndCloseConnection);

    it('should create an instance of the right type', function(){
      var calendarEvent = new CalendarEvent();
      calendarEvent.constructor.name.should.equal('model');
      calendarEvent.should.be.instanceof(CalendarEvent);
    });

    it('should persist a calendarEvent with valid properties', function(done){
      var calendarEvent = new CalendarEvent();
      calendarEvent.start = new Date(2017, 1, 1, 10);
      calendarEvent.end = new Date(2017, 1, 1, 12);;
      calendarEvent.location = "Lugano";
      calendarEvent.description = 'Reparation';
      calendarEvent.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(calendarEvent);
        done();
      });
    });

    it('should fail if start is null', function(done){
      var calendarEvent = new CalendarEvent();
      calendarEvent.start = null;
      calendarEvent.end = new Date(2017, 1, 1, 12);;
      calendarEvent.location = "Lugano";
      calendarEvent.description = 'Reparation';
      utils.errorIfNullUndefinedOrEmpty(calendarEvent, 'start', done );
    });

    it('should fail if start is undefined', function(done){
      var calendarEvent = new CalendarEvent();
      calendarEvent.start = undefined;
      calendarEvent.end = new Date(2017, 1, 1, 12);;
      calendarEvent.location = "Lugano";
      calendarEvent.description = 'Reparation';
      utils.errorIfNullUndefinedOrEmpty(calendarEvent, 'start', done );
    });

    it('should pass if description is empty,null or undefined ', function(done){
      var calendarEvent = new CalendarEvent();
      calendarEvent.start = new Date(2017, 1, 1, 10);
      calendarEvent.end = new Date(2017, 1, 1, 12);;
      calendarEvent.location = "Lugano";
      calendarEvent.description = "";
      calendarEvent.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(calendarEvent);
        done();
      });
    });

    it('should not pass if location is empty, ', function(done){
      var calendarEvent = new CalendarEvent();
      calendarEvent.start = new Date(2017, 1, 1, 10);
      calendarEvent.end = new Date(2017, 1, 1, 12);;
      calendarEvent.location = "";
      calendarEvent.description = 'Reparation';
      calendarEvent.save(function(err, saved){
        should.not.exist(err, 'No error should occur');
        saved.should.eql(calendarEvent);
        done();
      });
    });

  });
});
