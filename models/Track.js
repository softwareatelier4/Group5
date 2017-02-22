/** @module models/Track
* The Track Model
* Schema:
* _id            String     required   Unique identifier of the track
* name           String     required   Song name
* artist         ObjectId   required   Artist who performs or composed the track. It should be the `_id` of an artist object.
* duration       Number     required   Suration of the track in seconds
* file           String     required   URL of the location of the mp3 file of the track
* album          ObjectId   optional   Album this track is in. It should be the `_id` of an album object.
* id3Tags        Array      optional   An array of the id3Tags of the mp3 file of the track. Default: []
* dateReleased   Date       required   Date the track was released. Default: Date.now()
* dateCreated    Date       required   Date the track was created. Default: Date.now()
*/

//<!-- build:remove -->

'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

//<!-- /build -->

/** @constructor
* @param {Object} definition
*/
var trackSchema = new mongoose.Schema(
//<!-- build:remove -->

{
  name : { type: String, required: true },
  artist : { type: ObjectId, ref:'Artist', required: true },
  duration: { type: Number, required: true },
  file : { type: String, required: true },
  album : { type: ObjectId, ref:'Album' },
  id3Tags : { type: Array, default:[]},
  dateReleased : { type: String, default: Date.now },
  dateCreated : { type: String, default: Date.now }
}

//<!-- /build -->
);

//<!-- build:remove -->

//register model
mongoose.model('Track', trackSchema);

//<!-- /build -->