const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	headline: { type: String, required: true },
	summary: { type: String, required: true },
	link: { type: String, required: true },
	imgSrc: { type: String, required: true },
	createdAt: {type: Date, required: true, default: Date.now}
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
