/** @module models/index.js
* Loads all models
*/
'use strict';

var mongoose = require('mongoose');
require('./Review');
require('./Freelancer');
require('./User');
require('./Notification');
require('./CalendarEvent');

module.exports = {
  'Review' : mongoose.model('Review'),
  'Freelancer' : mongoose.model('Freelancer'),
  'User' : mongoose.model('User'),
  'Notification' : mongoose.model('Notification'),
  'CalendarEvent' : mongoose.model('CalendarEvent'),
}
