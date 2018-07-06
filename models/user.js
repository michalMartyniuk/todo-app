const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  todos: Array
})

module.exports = mongoose.model('user', userSchema);