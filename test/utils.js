/** @module test/model/utils
* Utilities for the model tests
*/

var config = require('../config')
var should = require('should');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/**
* Goes through a Mongoose ValidationError error to check specific properties
*/
var checkValidationErrorFields = module.exports.checkValidationErrorFields = function checkValidationErrorFields(err, prop){
  should.exist(err, 'There should be an error');
  err.name.should.equal('ValidationError');
  var propError = err.errors[prop];
  should.exist(propError, 'err.errors.' + prop + ' should exist');
  propError.name.should.equal('ValidatorError');
  propError.message.should.equal('Path `' + prop + '` is required.');
}

/**
* Checks if an error is thrown when a model's property is null undefined or empty
*/
module.exports.errorIfNullUndefinedOrEmpty = function errorIfNullUndefinedOrEmpty(obj, prop, done){
  //check undefined
  obj[prop] = undefined;
  obj.save(function(err, saved){
    checkValidationErrorFields(err, prop);

    //check null
    obj[prop] = null;
    obj.save(function(err, saved){
      checkValidationErrorFields(err, prop);

      //check empty
      obj[prop] = '';
      obj.save(function(err, saved){
        checkValidationErrorFields(err, prop);

        done();
      });
    });
  });
}

/**
* Checks if an error is thrown when a model's property is null or undefined
*/
module.exports.errorIfNullOrUndefined = function errorIfNullOrUndefined(obj, prop, done){
  //check undefined
  obj[prop] = undefined;
  obj.save(function(err, saved){
    checkValidationErrorFields(err, prop)

    //check null
    obj[prop] = null;
    obj.save(function(err, saved){
      checkValidationErrorFields(err, prop);

      done();
    });
  });
}

/**
* Goes through a Mongoose CastError error to check specific properties
*/
var checkCastErrorFields = module.exports.checkValidationErrorFields = function checkValidationErrorFields(err, prop, kind){
  var kind = kind || "ObjectID";
  should.exist(err, 'There should be an error');
  should.exist(err.errors[prop], 'There should be an err.errors[' + prop + ']');

  var err2Check =  err.errors[prop];
  err2Check.name.should.equal('CastError');
  err2Check.kind.should.equal(kind);
  err2Check.path.should.equal(prop);
}

/**
* Checks if an error is thrown when a model's property if not an ObjectId.
*/
module.exports.errorIfObjectIdReferenceIsWrong = function errorIfObjectIdReferenceIsWrong(obj, prop, done){
  //check with String
  obj[prop] = Math.random().toString(36).substring(7);
  obj.save(function(err, saved){
    checkCastErrorFields(err, prop);

    //check with Number
    obj[prop] = Math.floor(Math.random()*1000);
    obj.save(function(err, saved){
      checkCastErrorFields(err, prop);

      done();
    });
  });
}

/**
* Checks if an error is thrown when a model's property that is supposed to be an Array
* of ObjectIds' is assigned invalid data.
*/
module.exports.errorIfArrayObjectIdReferencesAreWrong = function errorIfArrayObjectIdReferencesAreWrong(obj, prop, done){
  //try to assign a value that is not an array
  obj[prop] = "Hello"
  obj.save(function(err, saved){
    checkCastErrorFields(err, prop, "Array");

    //check with String
    obj[prop] = [Math.random().toString(36).substring(7)];
    obj.save(function(err, saved){
      checkCastErrorFields(err, prop, "Array");

      //check with Number
      obj[prop] = [Math.floor(Math.random()*1000)];
      obj.save(function(err, saved){
        checkCastErrorFields(err, prop, "Array");
        done();
      });
    });
  });
}


/**
* Drops the database and closes the mongoose connection.
*/
module.exports.dropDbAndCloseConnection = function dropDbAndCloseConnection(done){
  //drop database
  mongoose.connection.db.dropDatabase( function(err){
    if(err) return done(err);

    //close connection
    mongoose.connection.close( function(err){
      if(err) return done(err);
      done();
    });
  });
}

/**
* Drops the database
*/
var dropDb = module.exports.dropDb = function dropDb(done){
  //drop database
  mongoose.connection.db.dropDatabase( function(err){
    if(err) return done(err);
    done();
  });
}

/**
* Connects to mongo and drops the database.
*/
module.exports.connectAndDropDb = function connectAndDropDb(done){
  //check if connection has opened but is not ready yet
  if (mongoose.connection && mongoose.connection.readyState ==2){
    mongoose.createConnection(config.mongoUrl + config.mongoDbName, function(err){
      if(err) return done(err);
      dropDb(done);
    });
  }else{
    mongoose.connect(config.mongoUrl + config.mongoDbName, function(err){
      if (err) {
        //if connection is already open it's fine
        if(err.message !== 'Trying to open unclosed connection.'){
          return done(err);
        }
      }
      dropDb(done);
    });
  }
}

module.exports.matchProfessionInText = function matchProfessionInText(text, freelancer){
  text.indexOf(freelancer.profession).should.be.greaterThan(-1, "profession should match");
}

module.exports.matchLocationInText = function matchLocationInText(text, freelancer){
  text.indexOf(freelancer.location).should.be.greaterThan(-1, "location should match");
}

module.exports.matchFreelancerIdInText = function matchFreelancerIdInText(text, freelancer){
  text.indexOf(freelancer._id.toString()).should.be.greaterThan(-1, "id should match");
}

module.exports.matchFreelancerVerificationInText = function matchFreelancerVerificationInText(text, freelancer){
  text.indexOf(freelancer.verification.toString()).should.be.greaterThan(-1, "id should match");
}

module.exports.matchUserNameInText = function matchUserNameInText(text, user){
  text.indexOf(user.userName.toString()).should.be.greaterThan(-1, "name should match");
}

module.exports.matchFreelancerReview = function matchFreelancerReview(text, review){
  console.log(text);
  console.log(review);
  text.indexOf(review).should.be.greaterThan(-1, "review should match");
}

module.exports.matchIDInText = function matchIDInText(text, freelancer){
  text.indexOf(freelancer._id.toString()).should.be.greaterThan(-1, "profession should match");
}

module.exports.matchIDInText = function matchIDInText(text, freelancer){
  text.indexOf(freelancer._id.toString()).should.be.greaterThan(-1, "profession should match");
}

function searchLinks(links, rel, href){
  var found = false;
  for(var i=0, l=links.length; i<l; i++){
    if(links[i].rel == rel){
      found=true
      links[i].href.indexOf(href).should.be.greaterThan(-1, "href should contain " + href);
      break;
    }
  }
  found.should.be.true;
}
