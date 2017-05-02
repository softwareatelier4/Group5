
'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const FreelancerSchema = require('./Freelancer');
const UserSchema = require('./User');


const NotificationSchema = new mongoose.Schema(
  {
    description         : { type: String, required: true },
    profession          : { type: String, required: true},
    category            : { type: String, enum: ['Tecnical Services', 'IT Services', 'Design', 'Management', 'Retail', 'Human Resources', 'Marketing', 'Consulting', 'Advertising', 'Logistics', 'Real Estate', 'Social Work', 'Healthcare', 'Other'], default: 'Other' },
    dateCreated         : { type: Date, default: Date.now() },
    userCalling         : { type: UserSchema, required: true },
    freelancerNotified  : { type: FreelancerSchema, required: true },
    status              : { type: String, enum: ['Pending', 'Refused', 'Accepted'], default: 'Pending' },
  }
);

//register model
mongoose.model('Notification', NotificationSchema);
