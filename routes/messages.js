var express = require('express');
var router = express.Router();
var Message = require('../models/message');

router.get('/', function (req, res, next) {
  Message.find()
         .exec(function (err, messages) {   //chain multiple methods to retrieve data and then call exec at the end to execute them all
           if(err) {
             return res.status(500).json({
               title: 'An Error occured',
               error: err
             });
           }

           res.status(200).json({
             message: 'Success',
             obj: messages
           });
         });
});

router.post('/', function (req, res, next) {
  var message = new Message({
    content: req.body.content
  });

  message.save(function(err,result) {
    if(err) {
      return res.status(500).json({
        title: 'An Error Occured',
        error: err
      });
    }

    res.status(201).json({
      message: 'Message Saved',
      obj: result
    });
  });
});

module.exports = router;
