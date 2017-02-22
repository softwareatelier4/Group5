var config = require('./config');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var dustjs = require('adaro');
var app = express();
var methodOverride = require('method-override')

// Connect to MongoDB here
//<!-- build:remove -->
var mongoose   = require('mongoose');
mongoose.connect(config.mongoUrl + config.mongoDbName);
//<!-- /build -->

// Register model definition here
//<!-- build:remove -->
require('./models');
//<!-- /build -->

// dustjs view engine setup
app.engine('dust', dustjs.dust());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'dust');

//configure app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    // parse application/json
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride(
function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}
));

// Initialize routers here
//<!-- build:remove -->

var routers = require('./routes/routers');
app.use('/', routers.root);
app.use('/albums', routers.albums);
app.use('/artists', routers.artists);
app.use('/tracks', routers.tracks);
app.use('/users', routers.users);

//<!-- /build -->

module.exports = app;
process.title = 'myapp'