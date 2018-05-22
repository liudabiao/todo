var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  "username": String,
  "password": String,
  "nickname": String,
  "todo": [{
    "date": String,
    "title": String,
    "status": Boolean,
    "content": String
  }]
});

module.exports = mongoose.model('user', userSchema);
