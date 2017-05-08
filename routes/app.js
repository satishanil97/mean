var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/message/:data',function(req, res, next) {
  res.render('node', {message: "Hello " + req.params.data + " !!!"});
});

router.post('/message',function(req, res, next) {
  var message = req.body.msg;
  res.redirect('/message/' + message);
});

module.exports = router;
