const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const axios = require('axios');
const cheerio = require('cheerio');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));

app.get("*", (req, res) => {
  res.sendFile('index.html', {
    root
  });
})

app.get('/scrape', async (req, res) => {
  const url = 'http://www.imdb.com/title/tt1229340/';
  try {
    const response = await axios.get(url);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
