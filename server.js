const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

const db = require('./models');
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
const root = require('path').join(__dirname, 'client', 'build');
app.use(express.static(root));

app.get('*', (req, res) => {
	res.sendFile('index.html', {
		root,
	});
});

app.listen(PORT, () => {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
});
