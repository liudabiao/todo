var mongoose = require('mongoose');
var todoSchema = new mongoose.Schema({
  "date": String,
  "username": String,
  "title": String,
  "content": String,
  "status": Boolean
});

module.exports = mongoose.model('todo', todoSchema);
