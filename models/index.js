/** @module models/index.js
* Loads all models
*/
'use strict';

var mongoose = require('mongoose');
require('./Freelancer');
require('./User');

module.exports = {
  'Freelancer' : mongoose.model('Freelancer'),
  'User' : mongoose.model('User')
}
