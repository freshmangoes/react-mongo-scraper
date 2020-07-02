const express = require('express');
const router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');

const Articles = require('../models/Article');
const Comment = require('../models/Comment');
// NOTE :: for later use
// const User = require('../models/User');


// front end
router.get('/', async (req, res) => {

});

// catch all route. should be the last front end route such that it doesn't interfere with any other routes
router.get('*', (req, res) => {
  res.redirect('/');
})
// api & back end

// route to fetch/scrape articles
router.get('/api/fetch-articles', async(req, res) => {

});

/*---------------------------------------------------------------------
TODO ::
- Function for getting article with axios/cheerio
- Function to push them to mongo
- Function to check for duplicate articles

---------------------------------------------------------------------*/