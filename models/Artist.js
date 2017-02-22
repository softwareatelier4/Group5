/** @module models/Artist
* The Artist Model
* Schema:
* _id            ObjectId   Unique identifier of the artist
* name           String     Full name of the artist or band
* genre          String     Genre of the artist. Default: 'rock'
* artwork        String     URL of the artwork picture for the artist.  Default: ''
* date_created   Date       Date the artist was created. Default: Date.now()
*/

'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

/** @constructor
* @param {Object} definition
*/
var ArtistSchema = new mongoose.Schema(

{
  name : { type: String, required: true },
  genre : { type: String, default: "rock" },
  artwork: { type: String, default: "" },
  dateCreated : { type: Date, default: Date.now }
}
);

//register model
mongoose.model('Artist', ArtistSchema);
