'use strict';

const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Freelancer = mongoose.model('Freelancer');
const config = require('../../config');
const serverErrors = require('../serverErrors')

const fieldsFilter = {
  '__v': 0
};

router.all('/', middleware.supportedMethods('GET, PUT, POST'));

router.get('/:freelancerid', function (req, res, next) {
  Freelancer.findById(req.params.freelancerid, fieldsFilter).lean().exec(function (err, freelancer) {
    // if (err) return next(err);
    if (!freelancer) {
      res.status(404);
      return res.status(404).json(serverErrors.notFound);
    }
    res.json(freelancer);
  });
});

// router.put('/', function (req, res) {
//   Freelancer.findOneAndUpdate({
//     _id: req.query.id
//   }, {
//     $set: {
//       verification: "pending"
//     }
//   }).exec(function (err, profiles) {
//     if (err) return console.error(err);
//     res.json(profiles);
//   });
// });



// router.post('/:freelancerid/review', function(req, res, next) {
//   var toAdd = new Review(req.body);
//   toAdd.save(onModelSave(res, 201, false));
//   Freelancer.findByIdAndUpdate(req.params.freelancerid, {$push: {"reviews": toAdd}},
//   {safe: true, upsert: true, new : true}, function(err, freelancer){
//     if (err) return next (err);
//     if (!freelancer) {
//       return res.json({
//         statusCode: 400,
//         message: "Bad Request"
//       });
//     }});
//     return;
//   });





// function onModelSave(res, status, sendItAsResponse){
//   var statusCode = status || 204;
//   var sendItAsResponse = sendItAsResponse || false;
//   return function(err, saved){
//     if (err) {
//       if (err.name === 'ValidationError'
//       || err.name === 'TypeError' ) {
//         res.status(400)
//         return res.json({
//           statusCode: 400,
//           message: "Bad Request"
//         });
//       }else{
//         return next (err);
//       }
//     }
//     if( sendItAsResponse){
//       var obj = saved.toObject();
//       delete obj.password;
//       delete obj.__v;
//       addLinks(obj);
//       return res.status(statusCode).json(obj);
//     }else{
//       return res.status(statusCode).end();
//     }
//   }
// }


// function addLinks(freelancer) {
//   freelancer.links = [{
//     "rel": "self",
//     "href": config.url + "/freelancer/" + freelancer._id
//   }];
// }

module.exports = router;
