var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
  User.findOne({} , function(err,data) {
    if(err) {
      return res.send("Error !!!");
    }

    res.render('node', {firstName: data.firstName, lastName: data.lastName, email: data.email});
  });

});

router.post('/',function(req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;

  var user = new User({
    firstName: firstName,
    lastName: lastName,
    password: password,
    email: email
  });

  user.save();
  res.redirect('/');
});

module.exports = router;
