/** @module models/Album
* The Album Model. 
* Schema:
* _id            String       required   Unique identifier of the album
* name           String       required   Name of the album
* artist         ObjectId     required   Artist who performs in this album. It should be the `_id` of an Artist model document.
* artwork        String       optional   URL of the artwork picture for the album. Default ''
* tracks         [ObjectId]   optional   Tracks that this album contains. They should be `_id`s of Track Model documents.
* dateCreated    Date         required   Date the album was created. Default: Date.now()
* dateReleased   Date         required   Date the album was released. Default: Date.now()
* label          String       optional   Record label of this album. Default: 'USI-INF records'
*/

//<!-- build:remove -->

'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

//<!-- /build -->

/** @constructor
* @augments AbstractSoundCollectionSchemaInstance
* @param {Object} definition
*/
var AlbumSchema = new mongoose.Schema(
//<!-- build:remove -->

{
  name : { type: String, required: true },
  tracks : { type: [ObjectId], ref: "Track" },
  artist : { type: ObjectId, ref:"Artist", required: true },
  artwork: { type: String, default: "" },
  dateReleased : { type: Date, default: Date.now },
  dateCreated : { type: Date, default: Date.now },
  label : { type: String, default: 'USI-INF records' }
}

//<!-- /build -->
);

//<!-- build:remove -->

//register model
mongoose.model('Album', AlbumSchema);

//<!-- /build -->
