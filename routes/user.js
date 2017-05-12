var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password,10),
    email: req.body.email
  });

  user.save(function (err, result) {
    if(err) {
      return res.status(500).json({
        title: 'An Error Occured',
        error: err
      });
    }

    res.status(201).json({
      message: 'User Added',
      obj: result
    });
  });
});

router.post('/signin', function (req, res, next) {
  User.findOne({email: req.body.email}, function (err, user) {
    if(err) {
      return res.status(500).json({
        title: 'An Error Occure',
        error: err
      });
    }

    if((!user) || (!bcrypt.compareSync(req.body.password, user.password))) {  //bcrypt.compareSync() compares if the hash produced by both the arguments are similar
      return res.status(401).json({
        title: 'Login Failed',
        error: {message: 'Invalid Login credentials'}
      });
    }

    //user exists and we have to create token for client to identify with the server
    var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200}); //this creates a new token and signs it -- //arguments -> payload, secret/privatekey, options, callback
    res.status(200).json({
      message: 'Login Successful',
      token: token,
      userId: user._id
    });
  });
});

module.exports = router;
