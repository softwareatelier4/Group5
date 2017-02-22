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

module.exports.matchAlbumInfoInText = function matchAlbumInfoInText(text, album){
   text.indexOf(album.name).should.be.greaterThan(-1, "name should be there");
   text.indexOf(album.artist.toString()).should.be.greaterThan(-1, "name should be there");
   text.indexOf(album.artwork).should.be.greaterThan(-1, "artwork should be there");
   text.indexOf(album.label).should.be.greaterThan(-1, "label should be there");
   if(! album.tracks) return;
   album.tracks.forEach(function(track){
     text.indexOf(track.toString())
       .should.be.greaterThan(-1, "tracks should be there");
   });
}

module.exports.matchArtistInfoInText = function matchArtistInfoInText(text, artist){
  text.indexOf(artist.name).should.be.greaterThan(-1, "name should be there");
  text.indexOf(artist.genre).should.be.greaterThan(-1, "genre should be there");
  text.indexOf(artist.artwork).should.be.greaterThan(-1, "arwork should be there");
}

var matchPlaylistInfoInText = module.exports.matchPlaylistInfoInText = function(text, playlists){
  playlists.forEach(function(playlist){
    text.indexOf(playlist.name.toString())
      .should.be.greaterThan(-1, "playlists should be there");
  });
}

module.exports.matchTrackInfoInText = function matchTrackInfoInText(text, track){
  text.indexOf(track.name).should.be.greaterThan(-1, "name should be there");
  text.indexOf(track.artist.toString()).should.be.greaterThan(-1, "artist should be there");
  text.indexOf(track.duration).should.be.greaterThan(-1, "duration should be there");
  text.indexOf(track.file).should.be.greaterThan(-1, "file should be there");
  text.indexOf(track.album.toString()).should.be.greaterThan(-1, "album should be there");
  text.indexOf(track.id3Tags).should.be.greaterThan(-1, "id3Tags should be there");
}

module.exports.matchUserInfoInText = function matchUserInfoInText(text, user){
  text.indexOf(user.userName).should.be.greaterThan(-1, "userName should be there");
  text.indexOf(user.firstName).should.be.greaterThan(-1, "firstName should be there");
  text.indexOf(user.lastName).should.be.greaterThan(-1, "lastName should be there");
  text.indexOf(user.email).should.be.greaterThan(-1, "email should be there");
  text.indexOf(user.password).should.equal(-1, "password should NOT be there");

  if(! user.playlists) return;
  matchPlaylistInfoInText(text, user.playlists)
}

module.exports.checkLinksForAlbum = function checkLinksForAlbum(album){
  should.exist(album.links);
  should.exist(album.links[0]);
  should.exist(album.links[0].rel);
  should.exist(album.links[0].href);
  searchLinks(album.links, 'self', "/albums/" + album._id );
  searchLinks(album.links, 'artist', "/artists/" + album.artist );
}

module.exports.checkLinksForArtist = function checkLinksForArtist(artist){
  should.exist(artist.links);
  should.exist(artist.links[0]);
  should.exist(artist.links[0].rel);
  should.exist(artist.links[0].href);
  artist.links[0].rel.should.equal('self');
  artist.links[0].href.indexOf("/artists/" + artist._id ).should.be.greaterThan(-1, "should have correct href");
}

module.exports.checkLinksForTrack = function checkLinksForTrack(track){
  should.exist(track.links);
  should.exist(track.links[0]);
  should.exist(track.links[0].rel);
  should.exist(track.links[0].href);
  searchLinks(track.links, 'self', "/tracks/" + track._id );
  searchLinks(track.links, 'artist', "/artists/" + track.artist );
  searchLinks(track.links, 'album', "/albums/" + track.album );
}

module.exports.checkLinksForUser = function checkLinksForUser(user){
  should.exist(user.links);
  should.exist(user.links[0]);
  should.exist(user.links[0].rel);
  should.exist(user.links[0].href);
  searchLinks(user.links, 'self', "/users/" + user._id );
  searchLinks(user.links, 'playlists', "/users/" + user._id + "/playlists" );
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
