/** @module models/Review
* The Review Model.
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
const ObjectId = mongoose.Schema.Types.ObjectId;


/** @constructor
* @augments AbstractSoundCollectionSchemaInstance
* @param {Object} definition
*/
const ReviewSchema = new mongoose.Schema(
  {
    rating : { type: Number, required: true },
    comment : { type: String},
    date : { type: Date },
  }
);


//register model
mongoose.model('Review', ReviewSchema);
