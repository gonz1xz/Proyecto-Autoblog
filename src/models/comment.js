const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  email: String,
  message: String,
  fecha: String
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;