var config = require('./config');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override')
const formidable = require('formidable');
const fs = require('fs');

// Connection to MongoDB
var mongoose = require('mongoose');
mongoose.promise = global.Promise;
mongoose.connect(config.mongoUrl + config.mongoDbName);

// Model definition registration
require('./models');

const ObjectId = mongoose.Types.ObjectId;
const Freelancer = mongoose.model('Freelancer');

//configure app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(path.join(__dirname, 'frontend')));

app.post('/claim/:id', function (req, res) {

  var dir = './frontend/src/claim-documents/';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  let filename = req.params.id;
  let form = new formidable.IncomingForm({
    uploadDir: __dirname + '/frontend/src/claim-documents',
    keepExtensions: true
  });

  form.parse(req, function (err, fields, files) {
    const name = files.file.name;
    const parts = name.split('.');
    const ext = parts[parts.length - 1];
    fs.rename(files.file.path, __dirname + '/frontend/src/claim-documents/' + filename + "." + ext);
    // res.json({name : filename});
    // res.end();

    Freelancer.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        verification: "pending",
        claimFilePath: '/src/claim-documents/' + filename + "." + ext,
      }
    }).exec(function (err, profiles) {
      if (err) return console.error(err);
      res.json(profiles);
    });
  });

});

app.use(methodOverride(
  function (req, res) {
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

app.use('*', function (req, res, next) {
  if (req.accepts('html')) {
    const options = {
      root: __dirname + '/frontend/',
    };
    return res.sendFile('index.html', options);
  }

  next();
})

app.use('/admin', routers.admin);
app.use('/claim', routers.claim);
app.use('/freelancer', routers.freelancer);


module.exports = app;
process.title = 'JobAdvisor'