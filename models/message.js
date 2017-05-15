var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var schema = new Schema({
  content: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', function(message) {  //mongoose provides this functionality to take an action based on an event in the database--here post => after
  User.findById(message.user, function (err, user) {
      user.messages.pull(message);
      user.save();
  });
});

module.exports = mongoose.model('Message', schema);
