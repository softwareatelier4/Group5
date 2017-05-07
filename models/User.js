/** @module models/User
* The User Model.
* Schema:
* userName        String       required   Username
* firstName       String       required   First Name of the user.
* lastName        String       optional   Last Name of the user.
* password        String       required   Password
* email           String       required   user email
* comm_rating     Number       required   Rating of comments he receives (0-10);
*/


'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const NotificationSchema = require('./Notification')


const userSchema = new mongoose.Schema(
  {
    userName  : { type: String, required: true },
    firstName : { type: String },
    lastName  : { type: String },
    password  : { type: String, required: true },
    email     : { type: String, required: true },
    userType  : { type: String, enum:['Admin', 'Freelancer', 'Normal'], default: 'Normal'},
    freelancerId : { type: String },
    notifications : { type: [NotificationSchema], default: [] }
  }
);

//register model
mongoose.model('User', userSchema);
