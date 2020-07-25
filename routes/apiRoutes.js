// API endpoints and logic for scraper live here.
// Will eventually push the scraped data to MongoDB, and have
// separate endpoints for getting the scraped articles from the DB.

const axios = require('axios');
const cheerio = require('cheerio');
const router = require('express').Router();
const moment = require('moment');

const db = require('../models');

router.get('/scrape', async (req, res) => {
	const url = 'https://www.nytimes.com/section/world';

	try {
		const data = await axios.get(url);
		// console.log(data.data);
		let $ = cheerio.load(data.data);
		// scrapes through the #collection-world id
		$('#collection-world')
			// finds each article element
			.find('article')
			// scrapes through each article element, using elem as 'each'
			.each(async function (i, elem) {
				// grabs h2 element for the headline
				let headline = $(elem).find('h2').text();
				// grabs p element for the summary
				let summary = $(elem).find('p').text();
				// grabs image element for image
				let imgSrc = $(elem).find('img').attr('src');
				// grabs a element and url fragment for link
				let link = 'https://nytimes.com' + $(elem).find('a').attr('href');
				// let timestamp = moment.unix();

				// prevents duplicate articles from being inserted
				if ((await db.Article.count({ headline })) > 0) {
					console.log('already created');
				} else {
					console.log('creating');
					await db.Article.create({
						headline,
						summary,
						link,
						imgSrc,
						// timestamp,
					});
				}
			});
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
	}
});

// route to get articles from MongoDB
router.get('/dbArticles', async (req, res) => {
	try {
		// gets all articles
		const result = await db.Article.find({}).sort({"timestamp": 1});
		res.send(result);
	} catch (err) {
		console.log('Error getting articles from database');
		console.log(err);
	}
});

module.exports = router;
