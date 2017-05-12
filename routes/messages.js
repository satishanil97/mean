var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var jwt = require('jsonwebtoken');
var User= require('../models/user');

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

router.use('/', function(req, res, next) {  //use() ensures that for every route request, it invokes this function after get() defined above -- this function is to check if a useris authenticated before letting him do any actions
  jwt.verify(req.query.token, 'secret',function (err, decoded) {  //token is passed as query i.e encoded in the url like ?token='secret'
    if(err) {
      return res.status(500).json({
        title: 'Not Authenticated',
        error: err
      });
    }

    next();   //proceed to the next mathcing request -- this is to let it continue to it's intended request if Authenticated
  });
});

router.post('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token); //decode() is used to decode a token...this function does'nt check for validity of token...but here we already checked validity earlier---
  //if validity is not checked , then we must use verify() itself as that also returns decoded object

  //now decoded contains the token
  User.findById(decoded.user._id, function(err, user) {
    if(err) {
      return res.status(500).json({
        title: 'An Error Occured',
        error: err
      });
    }

    var message = new Message({
      content: req.body.content,
      user: user  //linking message to the user
    });

    message.save(function(err, result) {
      if(err) {
        return res.status(500).json({
          title: 'An Error Occured',
          error: err
        });
      }

      user.messages.push(result); //add this message to the message list of current user
      user.save();
      res.status(201).json({
        message: 'Message Saved',
        obj: result
      });
    });
  });

});

router.patch('/:id', function (req, res, next) {    //PATCH - http request used for modifying an existing resource -- PUT request is used to entirely replace a resource
  Message.findById(req.params.id, function (err, message) {
    if(err) {
      return res.status(500).json({
        title: 'An Error Occured',
        error: err
      });
    }

    if(!message) {
      return res.status(500).json({
        title: 'Message Not Found',
        error: {message: 'Message Not Found'} //the errors thrown by mongoose (err) will contain the 'message' property..so it is good practice to be consistent with it
      });
    }

    message.content = req.body.content;
    message.save( function (err, result) {
      if(err) {
        return res.status(500).json({
          title: 'An Error Occured',
          error: err
        });
      }

      res.status(201).json({
        message: 'Message Updated',
        obj: result
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {    //DELETE - http request used for deleting a resource
  Message.findById(req.params.id, function (err, message) {
    if(err) {
      return res.status(500).json({
        title: 'An Error Occured',
        error: err
      });
    }

    if(!message) {
      return res.status(500).json({
        title: 'Message Not Found',
        error: {message: 'Message Not Found'} //the errors thrown by mongoose (err) will contain the 'message' property..so it is good practice to be consistent with it
      });
    }

    message.remove(function (err, result) {
      if(err) {
        return res.status(500).json({
          title: 'An Error Occured',
          error: err
        });
      }
      //removing this message from the list of messages of current user is done by the mongoose middleware that is defined in models/messages.js
      res.status(201).json({
        message: 'Message Deleted',
        obj: result
      });
    });
  });
});

module.exports = router;
