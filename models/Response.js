'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ResponseSchema = new mongoose.Schema(
  {
    comment : { type: String},
    date    : { type: Date },
  }
);

//register model
mongoose.model('Response', ResponseSchema);
