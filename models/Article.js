const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema constructor
const ArticleSchema = new Schema({
  // title/headline must be of type string
  // summary must be of type string
  // link/url must be of type string
  title: String,
  summary: String, 
  link: String,
  timeAdded: Number,

  // NOTE :: for later use 
  // comments: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Comment'
  //   }
  // ]
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;