var config = require('./config');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override')

// Connection to MongoDB
var mongoose   = require('mongoose');
mongoose.promise = global.Promise;
mongoose.connect(config.mongoUrl + config.mongoDbName);

// Model definition registration
require('./models');

//configure app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    // parse application/json
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(methodOverride(
function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}
));

// Initialize routers

var routers = require('./routes/routers');
app.use('/', routers.root);

app.use('/search', routers.search);
app.use('/admin', routers.admin);
app.use('*', function(req,res, next){
  if(req.accepts('html')){
    const options = {
      root: __dirname + '/frontend/',
    };
    return res.sendFile('index.html', options);
  }

  next();
})
app.use('/freelancer', routers.freelancer);


module.exports = app;
process.title = 'JobAdvisor'
