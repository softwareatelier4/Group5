
'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const FreelancerSchema = require('./Freelancer');
const UserSchema = require('./User');


const NotificationSchema = new mongoose.Schema(
  {
    description         : { type: String, required: true },
    profession          : { type: String, required: true},
    category            : { type: String, required: true },
    dateCreated         : { type: Date, default: Date.now() },
    userCalling         : { type: UserSchema, required: true },
    freelancerNotified  : { type: Number, required: true },
    availableFreelancers : { type: [String], required: true },
    status              : { type: String, enum: ['Pending', 'Refused', 'Accepted'], default: 'Pending', required: true },
  }
);

//register model
mongoose.model('Notification', NotificationSchema);
