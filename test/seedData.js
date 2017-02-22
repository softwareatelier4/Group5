'use strict';

var mongoose = require('mongoose');
var Playlist = mongoose.model('Playlist');
var ObjectId = mongoose.Types.ObjectId;

var artists = {
  name : 'Artist',
  data : [
    {
      "_id"          : ObjectId("5625fc2bd82b84d23d8c7bd5"),
      "name"         : "Iron Maiden",
      "genre"        : "New Wave of British Heavy Metal",
      "artwork"      : "http://piratevinyldecals.com/wps/wp-content/uploads/2014/01/Iron-Maiden-Army-pv194.png",
      "dateCreated"  : "Sat Sep 27 2014 10:39:20 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "AC/DC",
      "genre"        : "Hard Rock",
      "artwork"      : "http://images.plixid.com/imager/w_500/h_/5dcf8b1cc667012c55e0e497a5d71eaa.jpg",
      "dateCreated"  : "Sat Sep 27 2014 10:40:40 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Metallica",
      "genre"        : "Thrash Metal",
      "artwork"      : "http://rock-jazz-pop.com/wp-content/uploads/2011/11/Metallica_500.jpg",
      "dateCreated"  : "Sat Sep 27 2014 10:41:20 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Slayer",
      "genre"        : "Thrash Metal",
      "artwork"      : "http://zumic.com/wp-content/uploads/2014/04/slayer-implode-youtube-free-download-2014.jpg",
      "dateCreated"  : "Sat Sep 27 2014 10:41:43 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "God is an Astronaut",
      "genre"        : "Post Rock",
      "artwork"      : "http://38.media.tumblr.com/bb80c0bb50ad6cdd93aacf43621b8466/tumblr_n4s5k2Rn3c1qb48t9o1_500.jpg",
      "dateCreated"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)"
    }
  ]
}

var albums = {
  name : 'Album',
  data : [
    {
      "_id"          : ObjectId("5625fc2ad12b84d23d1c7bd5"),
      "artist"       : artists.data[0]._id,
      "name"         : "Somewhere in Time",
      "artwork"      : "http://sp4.fotolog.com/photo/36/22/82/felix_deadman/1250566555189_f.jpg",
      "dateReleased" : "Mon Sep 29 1986 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "label"        : "EMI"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[0]._id,
      "name"         : "Seventh Son of a Seventh Son",
      "artwork"      : "http://4.bp.blogspot.com/_jbyI24EsknA/TAi-EMVNVHI/AAAAAAAABPk/3bPMaQ2iC7w/s1600/Iron_Maiden_-_Seventh_Son_Of_A_Seve.jpg",
      "dateReleased" : "Mon Apr 11 1988 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "label"        : "EMI"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[1]._id,
      "name"         : "Back in Black",
      "artwork"      : "http://www.ar15.com/media/mediaFiles/1715/47731.JPG",
      "dateReleased" : "Fri Jul 25 1980 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "label"        : "Albert/Atlantic Records"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[1]._id,
      "name"         : "The Razors Edge",
      "artwork"      : "http://www.tasawakonline.com/uploads/2014/04/Razors+Edge+ACDC.jpg",
      "dateReleased" : "Mon Sep 24 1990 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "label"        : "Atco Records, Albert/EMI"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[2]._id,
      "name"         : "Ride the Lightning",
      "artwork"      : "http://www.metal-archives.com/images/5/4/4/544.jpg",
      "dateReleased" : "Fri Jul 27 1984 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "label"        : "Megaforce"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[2]._id,
      "name"         : "Master of Puppets",
      "artwork"      : "http://www.blogdosedupla.com.br/wp-content/uploads/2012/12/Master+of+Puppets+PNG.png",
      "dateReleased" : "Mon Feb 24 1986 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "label"        : "Elektra/Asylum"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[3]._id,
      "name"         : "Reign in Blood",
      "artwork"      : "http://www.metal411.com/wp-content/uploads/2013/10/reign-in-blood.png",
      "dateReleased" : "Tue Oct 07 1986 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "label"        : "Def Jam"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[3]._id,
      "name"         : "South of Heaven",
      "artwork"      : "http://metalholic.com/wp-content/uploads/2013/03/slayer-south_of_heaven.jpg",
      "dateReleased" : "Tue Jul 05 1988 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "label"        : "Def Jam"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[4]._id,
      "name"         : "All Is Violent, All Is Bright",
      "artwork"      : "http://i53.fastpic.ru/big/2013/0201/f3/b9f8026551c2fb3ce375797aeef73bf3.jpg",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)",
      "label"        : "Revive Records"
    },
]
}

var tracks = {
  name : 'Track',
  data : [
    {
      "_id"          : ObjectId("6665fc2ac12b84d13d1c7bd5"),
      "artist"       : artists.data[0]._id,
      "album"        : albums.data[0]._id,
      "name"         : "Caught Somewhere in Time",
      "duration"     : 442,
      "file"         : "tracks_folder/1.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Mon Sep 29 1986 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[0]._id,
      "album"        : albums.data[1]._id,
      "name"         : "The Clairvoyant",
      "duration"     : 268,
      "file"         : "tracks_folder/2.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Mon Apr 11 1988 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[1]._id,
      "album"        : albums.data[2]._id,
      "name"         : "Thunderstruck",
      "duration"     : 292,
      "file"         : "tracks_folder/3.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[1]._id,
      "album"        : albums.data[3]._id,
      "name"         : "Hells Bells",
      "duration"     : 310,
      "file"         : "tracks_folder/4.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Mon Sep 24 1990 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[2]._id,
      "album"        : albums.data[4]._id,
      "name"         : "The Call of Ktulu",
      "duration"     : 535,
      "file"         : "tracks_folder/5.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Jul 27 1984 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[2]._id,
      "album"        : albums.data[5]._id,
      "name"         : "Master of Puppets",
      "duration"     : 515,
      "file"         : "tracks_folder/6.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Mon Feb 24 1986 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[2]._id,
      "album"        : albums.data[5]._id,
      "name"         : "Orion",
      "duration"     : 507,
      "file"         : "tracks_folder/7.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Mon Feb 24 1986 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[3]._id,
      "album"        : albums.data[6]._id,
      "name"         : "Raining Blood",
      "duration"     : 298,
      "file"         : "tracks_folder/8.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Tue Oct 07 1986 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[3]._id,
      "album"        : albums.data[7]._id,
      "name"         : "South of Heaven",
      "duration"     : 299,
      "file"         : "tracks_folder/8.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Tue Jul 05 1988 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[4]._id,
      "album"        : albums.data[8]._id,
      "name"         : "All Is Violent, All Is Bright",
      "duration"     : 255,
      "file"         : "tracks_folder/10.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[4]._id,
      "album"        : albums.data[8]._id,
      "name"         : "A Deafening Distance",
      "duration"     : 229,
      "file"         : "tracks_folder/11.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
    }
  ]
}

var users = {
  name : 'User', 
  data : [
    {
      "_id"          : ObjectId(),
      "firstName"    : "Masiar",
      "lastName"     : "Babazadeh",
      "userName"     : "masiar",
      "email"        : "masiar.babazadeh@usi.ch",
      "password"     : "ciao",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)",
      "playlists"    : [
         new Playlist ({
          "name" : 'Thrash Metal favs',
          "tracks": [tracks.data[0]._id, tracks.data[1]._id]
        }),
          new Playlist ({
          "name" : 'Thrash Metal favs 2',
          "tracks": [tracks.data[3]._id, tracks.data[4]._id]
        })
      ]
    },

    {
      "_id"          : ObjectId(),
      "firstName"    : "Robert",
      "lastName"     : "Sapolsky",
      "userName"     : "rob",
      "email"        : "sapolsky@stanford.edu",
      "password"     : "baboon",
      "dateCreated"  : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)",
      "playlists"    : [
         new Playlist ({
          "name" : 'Thrash Metal favs',
          "tracks": [tracks.data[0]._id, tracks.data[1]._id]
        }),
          new Playlist ({
          "name" : 'Thrash Metal favs 2',
          "tracks": [tracks.data[6]._id, tracks.data[7]._id]
        })
      ]
    },

    { 
      "_id"          : ObjectId(),
      "firstName"    : "Vasileios",
      "lastName"     : "Triglianos",
      "userName"     : "vassilis",
      "email"        : "vasileios.triglianos@usi.ch",
      "password"     : "ciao",
      "dateCreated"  : "Sat Sep 27 2014 10:28:21 GMT+0200 (CEST)",
      "playlists"    : [
         new Playlist ({
          "name" : 'Iron maiden',
          "tracks": [tracks.data[0]._id, tracks.data[1]._id]
        }),
          new Playlist ({
          "name" : 'Thrash Metal favs 3',
          "tracks": [tracks.data[5]._id, tracks.data[6]._id]
        })
      ]
    }
  ]
}

var seedData = [];
seedData.push(artists);
seedData.push(albums);
seedData.push(tracks);
seedData.push(users);

module.exports = seedData;
