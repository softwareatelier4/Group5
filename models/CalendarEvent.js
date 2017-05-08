'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const CalendarEventSchema = new mongoose.Schema(
  {
    location    : { type: String, required: true },
    description : { type: String, required: true },
    start       : { type: Date, required: true },
    end         : { type: Date, required: true }
  }
);


//register model
mongoose.model('CalendarEvent', CalendarEventSchema);
