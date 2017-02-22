## Getting Started
### Install dependencies
To install the dependencies for the exercise (express.js, mongoose, testing framework, etc.) type:

    npm install

### Run the server
`app.js` is exported as a module so that we can  `require()` it from other modules, eg. out tests. For this reason the server does not `listen()` from within `app.js`. The initialization of the server is carried out with `./bin/www`, an executable file the _requires_ `app.js` calls `listen()`. To start:

    npm start
or

    DEBUG='atelierbeats-server' node ./bin/www
The `DEBUG` environmental variable is read by the excellent [debug](https://github.com/visionmedia/debug) module which allows to isolate debug messages output per module.

### Anatomy of a skeleton

    |-- README.html //What you're reading right now
    |-- README.md // Source for what you're reading right now
    |-- app.js //main file
    |-- bin
    |   `-- www //starts app.js
    |   `-- installSeleniumAndChromeWebDriver //installs selenium and chrome driver
    |-- config.js  //configuration like mongodb url
    |-- models //models go here
    |   |-- Album.js
    |   |-- Artist.js
    |   |-- Playlist.js
    |   |-- Track.js
    |   |-- User.js
    |   `-- index.js //lists all models so we can register the mongoose models with one `require()`
    |-- node_modules //npm packages
    |-- package.json
    |-- public
    |   |-- css
    |-- routes  //routers go here
    |-- seed.js //executed it to seed the database
    |-- test
    |   |-- ex1 //tests for Exercise 1
    |   |-- ex2 //tests for Exercise 2
    |   |-- ex3 //tests for Exercise 3
    |   |-- ex4 //tests for Exercise 4
    |   |-- ex5 //tests for Exercise 5
    |   |-- seedData.js //used by seedDb.js
    |   |-- seedDb.js //seeds the database
    |   `-- utils.js //various utils for the tests
    `-- views
        `-- index.dust //template for GET /

##REST API
###Overview
Your API will expose your model. The root URL will have links for all the resources of your API.

For each one of `Album`, `Artist`, `Track`, `User` you have to create routes that:

* __list__ all instances of the model (read all resources)
* __create__ a new instance of the model (create a new resource)
* __list__ an instance of the model  (read a resource)
* __update__ a an instance of the model (update a resource)
* __delete__ a an instance of the model (delete a resource)

The `Playlist` model is a special case since it's a subresource of teh `User model`.

<span style="text-decoration:underline; font-weight:bold">Important</span>: You should __NOT__ send the `password` field of the `User` model to client requests.
   
All the routes for Exercise 2:

    #root 
    GET /

    #Album model
    GET /albums
    POST /albums

    GET /albums/:albumid
    PUT /albums/:albumid
    DELETE albums/:albumid

    #Artist model
    GET /artists
    POST /artists

    GET /artists/:artistid
    PUT /artists/:artistid
    DELETE artists/:artistid

    #Track model
    GET /tracks
    POST /tracks

    GET /tracks/:trackid
    PUT /tracks/:trackid
    DELETE tracks/:trackid

    #User model
    GET /users
    POST /users

    GET /users/:userid
    PUT /users/:userid
    DELETE users/:userid

    #Playlist model
    GET /users/:userid/playlists
    PUT /users/:userid/playlists

### Responses

* The responses' bodies should be in JSON format with `ContentType: application/json`. 
  The only __exception__ is the `/` route which also supports `text/html` (you have to render the `index.dust` template).
* If everything is successful and the response contains data, the status code should be `200 OK`.
* If a __new__ resource was created as a result from a `PUT` or a `POST` request, the status code should be `201 Created`.
* If everything is successful and the response contains no data (as is the case with a successful `DELETE`, or a successful `PUT` in a resource that exists), the status code should be `204 No Content`. In this case the response has no body.
* If resource (model instance) with the id of the request does not exist, the response's status code should be `404 Not Found`.

### Examples
Note: In the examples we only present the headers of interest.
#### `GET /`

    #Request headers
    GET / HTTP/1.1
    Host: localhost:3000
    Accept: text/html    
    
    200 OK
    #Response headers
    Content-Type: text/html; charset=utf-8

Response body:

    <!DOCTYPE html>
    <html>
        <head>
            <title>AtelierBeats API Server</title>
            <link rel='stylesheet' href='/css/style.css' />
        </head>
        <body>
            <h1 class="heading">AtelierBeats API Server</h1>
            <h3>Resources</h3>
            <ul class="links">
                <li class="link">
                    <span class="rel">albums</span>
                    <a href="">http://localhost:3000/albums</a>
                </li>
                <li class="link">
                    <span class="rel">artists</span>
                    <a href="">http://localhost:3000/artists</a>
                </li>
                <li class="link">
                    <span class="rel">playlists</span>
                    <a href="">http://localhost:3000/playlists</a>
                </li>
                <li class="link">
                    <span class="rel">tracks</span>
                    <a href="">http://localhost:3000/tracks</a>
                </li>
                <li class="link">
                    <span class="rel">users</span>
                    <a href="">http://localhost:3000/users</a>
                </li>
            </ul>
            <p>Note that the resources response bodies are in JSON format with 
                <code>Content-Type: application/json</code>
            </p>
        </body>
    </html>

#### `GET /`

    #Request headers
    GET / HTTP/1.1
    Host: localhost:3000
    Accept: application/json
    
    200 OK
    #Response headers
    Content-Type: application/json; charset=utf-8

Response body:

    [
        {
            "rel": "albums",
            "href": "http://localhost:3000/albums"
        },
        {
            "rel": "artists",
            "href": "http://localhost:3000/artists"
        },
        {
            "rel": "playlists",
            "href": "http://localhost:3000/playlists"
        },
        {
            "rel": "tracks",
            "href": "http://localhost:3000/tracks"
        },
        {
            "rel": "users",
            "href": "http://localhost:3000/users"
        }
    ]

#### `GET /users`

    #Request headers
    GET /users HTTP/1.1
    Host: localhost:3000
    Accept: application/json
    
    200 OK
    #Response headers
    Content-Type: application/json; charset=utf-8

Response body:

    [
        {
            "_id": "544571bdb96600d9c97bdfc5",
            "firstName": "Masiar",
            "lastName": "Babazadeh",
            "userName": "masiar",
            "email": "masiar.babazadeh@usi.ch",
            "playlists": [
                {
                    "_id": "544571bdb96600d9c97bdfbf",
                    "name": "Thrash Metal favs",
                    "dateCreated": "2014-10-20T20:34:05.267Z",
                    "tracks": [
                        "544571bdb96600d9c97bdfb4",
                        "544571bdb96600d9c97bdfb5"
                    ]
                },
                {
                    "_id": "544571bdb96600d9c97bdfc0",
                    "name": "Thrash Metal favs 2",
                    "dateCreated": "2014-10-20T20:34:05.269Z",
                    "tracks": [
                        "544571bdb96600d9c97bdfb7",
                        "544571bdb96600d9c97bdfb8"
                    ]
                }
            ],
            "dateCreated": "2014-10-20T20:34:05.808Z"
        },
        {
            "_id": "544571bdb96600d9c97bdfc6",
            "firstName": "Robert",
            "lastName": "Sapolsky",
            "userName": "rob",
            "email": "sapolsky@stanford.edu",
            "playlists": [
                {
                    "_id": "544571bdb96600d9c97bdfc1",
                    "name": "Thrash Metal favs",
                    "dateCreated": "2014-10-20T20:34:05.269Z",
                    "tracks": [
                        "544571bdb96600d9c97bdfb4",
                        "544571bdb96600d9c97bdfb5"
                    ]
                },
                {
                    "_id": "544571bdb96600d9c97bdfc2",
                    "name": "Thrash Metal favs 2",
                    "dateCreated": "2014-10-20T20:34:05.269Z",
                    "tracks": [
                        "544571bdb96600d9c97bdfba",
                        "544571bdb96600d9c97bdfbb"
                    ]
                }
            ],
            "dateCreated": "2014-10-20T20:34:05.810Z"
        },
        {
            "_id": "544571bdb96600d9c97bdfc7",
            "firstName": "Vasileios",
            "lastName": "Triglianos",
            "userName": "vassilis",
            "email": "vasileios.triglianos@usi.ch",
            "playlists": [
                {
                    "_id": "544571bdb96600d9c97bdfc3",
                    "name": "Iron maiden",
                    "dateCreated": "2014-10-20T20:34:05.269Z",
                    "tracks": [
                        "544571bdb96600d9c97bdfb4",
                        "544571bdb96600d9c97bdfb5"
                    ]
                },
                {
                    "_id": "544571bdb96600d9c97bdfc4",
                    "name": "Thrash Metal favs 3",
                    "dateCreated": "2014-10-20T20:34:05.269Z",
                    "tracks": [
                        "544571bdb96600d9c97bdfb9",
                        "544571bdb96600d9c97bdfba"
                    ]
                }
            ],
            "dateCreated": "2014-10-20T20:34:05.812Z"
        }
    ]

#### `GET /users/:userid`

    #Request headers
    GET /users/544571bdb96600d9c97bdfc6 HTTP/1.1
    Host: localhost:3000
    Accept: application/json

    200 OK
    #Response headers
    Content-Type: application/json; charset=utf-8

Response body:

    {
        "_id": "544571bdb96600d9c97bdfc6",
        "firstName": "Robert",
        "lastName": "Sapolsky",
        "userName": "rob",
        "email": "sapolsky@stanford.edu",
        "playlists": [
            {
                "_id": "544571bdb96600d9c97bdfc1",
                "name": "Thrash Metal favs",
                "dateCreated": "2014-10-20T20:34:05.269Z",
                "tracks": [
                    "544571bdb96600d9c97bdfb4",
                    "544571bdb96600d9c97bdfb5"
                ]
            },
            {
                "_id": "544571bdb96600d9c97bdfc2",
                "name": "Thrash Metal favs 2",
                "dateCreated": "2014-10-20T20:34:05.269Z",
                "tracks": [
                    "544571bdb96600d9c97bdfba",
                    "544571bdb96600d9c97bdfbb"
                ]
            }
        ],
        "dateCreated": "2014-10-20T20:34:05.810Z"
    }

#### `DELETE /users/:userid`

    #Request headers
    DELETE /users/544571bdb96600d9c97bdfc6 HTTP/1.1
    Host: localhost:3000
    Accept: application/json

    204 No Content
    #Response headers

Response body: No response body

#### `POST /users`

    #Request headers
    POST /users HTTP/1.1
    Host: localhost:3000
    Accept: application/json
    Content-Type: application/json
    { "firstName" : "Seth", "lastName" : "MacFarlane", "userName" : "seth", "email" : "seth.macfarlane@gmail.com", "password" : "peg" }

    201 Created
    #Response headers
    Content-Type: application/json; charset=utf-8

Response body:

    {
        "firstName": "Seth",
        "lastName": "MacFarlane",
        "userName": "seth",
        "email": "seth.macfarlane@gmail.com",
        "_id": "5445ab5efd392f0000cc67a6",
        "playlists": [],
        "dateCreated": "2014-10-21T00:39:58.362Z"
    }

#### `PUT /users/:userid`

    #Request headers
    PUT /users/5445ab5efd392f0000cc67a6 HTTP/1.1
    Host: localhost:3000
    Accept: application/json
    Content-Type: application/json
    { "firstName" : "Seth", "lastName" : "MacFarlane", "userName" : "seth", "email" : "seth@gmail.com", "password" : "peg" }

    204 No Content
    #Response headers

Response body: No response body

###Hypermedia

Optionally, in Exercise 3 you can make your app generate links to related resources. You can find some more info at [http://spring.io/understanding/HATEOAS ](http://spring.io/understanding/HATEOAS ).
Minimally, each resource should have a link with a `"rel": "self"`. The `href` of the links should be the full URI of the resource (including host and port).

Here's an example of what a track would look like with hypermedia support:

    #Request headers
    GET /tracks/54451002befd9900009df5a5 HTTP/1.1
    Host: localhost:3000
    Accept: application/json

    200 OK
    #Response headers
    Content-Type: application/json; charset=utf-8

Response body:

    {
        "_id": "54451002befd9900009df5a5",
        "artist": "54451002befd9900009df592",
        "album": "54451002befd9900009df59b",
        "name": "All Is Violent, All Is Bright",
        "duration": "255",
        "file": "tracks_folder/10.mp3",
        "dateCreated": "1413812226943",
        "dateReleased": "1413812226943",
        "id3Tags": [],
        "links": [
            {
                "rel": "self",
                "href": "http://localhost:3000/tracks/54451002befd9900009df5a5"
            },
            {
                "rel": "artist",
                "href": "http://localhost:3000/artists/54451002befd9900009df592"
            },
            {
                "rel": "album",
                "href": "http://localhost:3000/artists/54451002befd9900009df59b"
            }
        ]
    }

### Not allowed methods

Optionally, in Exercise 4 you should return a `405 Method Not Allowed`HTTP status code, when a resource is called with a method that is not allowed. Be carefull not to return a `405` on an `OPTIONS` request for your routes since it is supported by default from Express. 
Express [middleware](http://expressjs.com/api.html#middleware) may come in handy for this task.

Example:

    #Request headers
    PATCH /artists/5445cde849c7e43f5d1ce449 HTTP/1.1
    Host: localhost:3000
    Accept: application/json
    Content-Type: application/json
    { "op": "replace", "path": "/genre", "value": "Folk Rock" },

    405 Method not Allowed
    #Response headers

Response body: No response body

## Testing
### Overview
Tests are under the `test/` dir are organized by exercise:

* `ex1` are model tests 
* `ex2`, `ex3` and `ex4` are API tests
* `ex5` are functional test that fire up your browser


We use [Mocha](https://mochajs.org/) as the test runner and [should.js](https://github.com/shouldjs/should.js) is the assertion library. For the API tests we use [supertest](https://github.com/tj/supertest), a library on top of [superagent](https://visionmedia.github.io/superagent/). Finally for the browser testing we use [nightwatch](http://nightwatchjs.org/)

### Running all the tests except from the browser ones (exercises 1 to 4)
TL;DR:
    
    npm test

_Full Version_: You don't have to start the server, the tests are going to start it automatically.
If you have a look at the `package.json` you will see the following entry:

    "test": "npm run test-mocha"

which wil call in turn

    "test": "./node_modules/mocha/bin/mocha -R spec ./test/ex1 ./test/ex2 ./test/ex3 ./test/ex4"

under the `scripts` property. This command runs `mocha` on the target directories with a test reporter named `spec`. To run the command just enter:

    npm test

_Important_: The above command will not run the tests for Exercise 5. These tests are browser tests and you can see how to run them in the following section.

## Running the browser tests (for exercise 5)
TL;DR:
    
    npm start # in seperate terminal
    npm run test-nightwatch

_Full Version_: First you __need__ to start your server:

    npm start

Now,  in the `package.json`, you will see the following entry:

    "test-nightwatch": "node seed.js && ./nightwatch"

under the `scripts` property. This command runs `nightwatch` with the configuration specified in `nightwatch.conf.js`. To run the command just enter:

    npm run test-nightwatch

_Note_: Nightwatch needs a selenium driver and a chrome driver to run the tests. When you ran 'npm install' the script `"./bin/installSeleniumAndChromeWebDriver"` should have been executed and install the dependencies for you. If make sure it has executable permissions with:

    chmod u+x ./bin/installSeleniumAndChromeWebDriver

and run it again with:

    ./bin/installSeleniumAndChromeWebDriver


### Running individual mocha tests (exercises 1 to 4)
If you want to run an individual test or set of tests do

    ./node_modules/mocha/bin/mocha -R spec <file-or-dir-1> <file-or-dir-2> ... <file-or-dir-n>

To make things a bit easier, install `mocha` globally with:

    npm install -g mocha

This will allow you to run tests like:

    mocha -R spec <file-or-dir-1> <file-or-dir-2> ... <file-or-dir-n>

## Tips and Tricks
###Installing npm packages
To install an [npm](https://www.npmjs.org/) package and save it to package.json:

    npm install --save <package-name>

###Productivity

* __[nodemon](http://nodemon.io/)__ monitors changes in your source and restarts the server automatically. 

install with:
   
    npm install -g nodemon

* __[livereload](http://livereload.com/)__ monitors changes in your source and refreshes your browser. It also supports preprocessing, for example compiling [LESS](http://lesscss.org/) files .

install with:
   
    npm install -g livereload

###Seed db
If you have implemented your model and the model tests pass, you should be able to seed the db with some data by typing:

    node seed.js //it will drop the db first

### Upload
`body-parser` is already set up for you. It's better if you set `Content-Type: 'application/json'` when you upload. The uploaded body will be available under `req.body` in you route handlers. 

### How to organize your routes
This is a matter of personal preference but here's some rough guidelies: 

* __Your logic is small (< 20-30 Lines Of Code (LOC) per route) and you don't have a lot or subroutes (say less than 10 for a specific resource)__.  In this case you may have one file per resource where you define the router, routes and logic and one file shared by all resources for common functionality. 

Example dir tree:

    routes
    |-- index.js      // router, routes and logic for /
    |-- artists.js    // router, routes and logic for /artists (model Artist)
    |-- tracks.js     // router, routes and logic for /tracks (model Track)
    |-- utils.js      // common functionality shared among all routes

* __Your logic is average (between 20 and 100 LOC per route) and you have a lot of subroutes (say more than 15 for a specific)__. In this case for each resource you may have a dir with a `router.js`, `handler.js` and `util.js`. `router.js` will host the router instantiation and the assignment of handlers and middleware to routes. `handler.js` will host the handler functions implemantation. `util.js` will have functionality that is common within the specific resource. It's important to note that a 100 LOC function is a good indication that you need to break this function to smaller ones that focus on one thing. Finally, like in the first scenario, for functionality that is common among all resources, can create one shared file that implements all this functionality.

Example dir tree:

    routes
    |-- utils.js      //common functionality shared among all routes
    `-- root
        `-- router.js  // router and routes for /
        `-- handler.js // logic for /
        `-- utils`.js  // common functionality with /
    `-- artists
        `-- router.js  // router and routes for /artists
        `-- handler.js // logic for /artists (model Artist)
        `-- utils`.js  // common functionality with /artists
    `-- tracks
        `-- router.js  // router and routes for /tracks
        `-- handler.js // logic for /tracks (model Track)
        `-- utils`.js  // common functionality with /tracks

If your logic is bigger than the _average_ case then it's better if your logic is organized on a per feature basis (for example 'Upload', 'Control Panel').

### Do not Repeat Yourself - DRY
You may notice that some tasks are repeated often. Examples:

* `Model.findbyId` when a route has an :id parameter.
* sending `404`'s when an `id` doesn't exist
* mongoose error handling for `POST` or `PUT` requests. First we check if it's a `CastError` or `TypeError` to send `400 - Bad Request` otherwise send `500`);

To conform to the DRY principle it helps to refactor common code so that is reusable by the rest of the app. Some express tips to help you with that:

* [middleware](http://expressjs.com/api.html#middleware)
* [app param](http://expressjs.com/api.html#app.param) and [router params](http://expressjs.com/api.html#router.param)
* [mongoose middleware](http://mongoosejs.com/docs/middleware.html)

Of course, for a lot of cases just moving boilerplate code to separate functions is enough.
### Mongoose

* [MongoHub](https://github.com/jeromelebel/MongoHub-Mac) is a GUI client for MongoDB. It can help you inspect your data, delete stuff etc.
* __Password Encryption__. It's not very secure to store user passwords unencrypted. [bcrypt](https://github.com/ncb000gt/node.bcrypt.js/) can help you encrypt your passwords for mongoose. This [article](http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt) has more info on how to do that. 
If you decide to implement this, uncomment the relevant test in `test/ex1/user.js`
* ` mongoose.Schema.Types.ObjectId` __!=__ ` mongoose.Types.ObjectId`. The former is used when defining a schema type, the latter when you want to create an ObjectId and assign it to a model instance property.

Example:
  
    //Creating a Schema  
    var mongoose = require('mongoose')
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var Track = new Schema({
      artist : {type: ObjectId, ref:'Artist'}
    });

    //Creating a model instance  
    var mongoose = require('mongoose')
    var ObjectId = mongoose.Types.ObjectId;
    
    var artist = new Artist({
      _id : ObjectId()
    });

    var Track = new Track({
      artist: artist._id
    });
