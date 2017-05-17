/** @module models/Freelancer
* The Freelancer Model.
* Schema:
* _id            String       required    Unique identifier of the freelancer.
* firstName      String       required    Name of the freelancer.
* lastName       String       required    Lastname of the freelancer.
* address        String       required    Address of the freelancer.
* description    String       optional    Description of the freelancer.
* profession     String       optional    Job category of the freelancer.
* rating         Integer      optional    Rating of the freelancer.
* email          String       required    Email of the freelancer.
* phone number   String       required    Phone number of the freelancer.
* location       String       required    Location of the freelancer.
* price          Integer      optional    Average price of the freelancer.
*/


'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const ObjectId = mongoose.Schema.Types.ObjectId;
const ReviewSchema = require('./Review');
const CalendarEventSchema = require('./CalendarEvent');

const FreelancerSchema = new mongoose.Schema(
  {
    firstName     : { type: String, required: true },
    lastName      : { type: String, required: true },
    address       : { type: String, required: true },
    description   : { type: String},
    profession    : { type: String, required: true},
    category      : { type: String, enum:['Tecnical Services', 'IT Services', 'Design', 'Management', 'Retail', 'Human Resources', 'Marketing', 'Consulting', 'Advertising', 'Logistics', 'Real Estate', 'Social Work', 'Healthcare', 'Other'], default:'Other' },
    rating        : { type: Number },
    email         : { type: String, required : true},
    phone_number  : { type: String, required : true},
    price         : { type: Number },
    image         : { type: String, default: '/src/images/blank-user.jpg'},
    reviews       : { type: [ObjectId], ref: "Review", required: false },
    events        : { type: [ObjectId], ref: "CalendarEvent", required: false },
    verification  : { type: String, enum:['verified', 'pending', 'none'], default:'none' },
    claimFilePath : { type: String},
    claimComment  : { type: String},
    claimEmail    : { type: String},
    claimingUserId: { type: String}, // the id of the user who issued the claim request, it may be denied
    userId        : { type: String}, // the id of the user who succesfully claimed the profilea
  }
);

//register model
mongoose.model('Freelancer', FreelancerSchema);
