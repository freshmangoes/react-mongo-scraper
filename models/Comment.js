const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  // body must be of type string
  body: {
    type: String,
    trim: true,
    required: 'Comment body is required'
  },
  username: {
    type: String,
    trim: true,
    required: 'Username is required to comment'
  }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;