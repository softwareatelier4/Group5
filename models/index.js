/** @module models/index.js
* Loads all models
*/
'use strict';

var mongoose = require('mongoose');

require('./Album');
require('./Artist');
require('./Playlist');
require('./Track');
require('./User');

module.exports = {
  'Album' : mongoose.model('Album'),
  'Artist' : mongoose.model('Artist'),
  'Playlist' : mongoose.model('Playlist'),
  'Track' : mongoose.model('Track'),
  'User' : mongoose.model('User')
}

