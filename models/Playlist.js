/** @module models/Playlist
* The Playlist Model.
* Schema:
* _id           String       required   unique identifier of the playlist.
* name          String       required   name of the playlist.
* tracks        [ObjectId]   optional   tracks that this playlist contains. They should be `_id`s of Track model documents.
* dateCreated   Date         required   date the playlist was created. Default: Date.now()
*/

//<!-- build:remove -->

'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

//<!-- /build -->

/** @constructor
* @param {Object} definition
*/
var PlaylistSchema = new mongoose.Schema(
  //<!-- build:remove -->

  {
    name : { type: String, required: true },
    tracks : { type: [ObjectId], ref: "Track" },
    dateCreated : { type: Date, default: Date.now },
  }

  //<!-- /build -->
);

//<!-- build:remove -->

//register model

mongoose.model('Playlist', PlaylistSchema);
module.exports = PlaylistSchema;

//<!-- /build -->