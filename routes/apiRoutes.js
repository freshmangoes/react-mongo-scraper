// API endpoints and logic for scraper live here.
// Will eventually push the scraped data to MongoDB, and have
// separate endpoints for getting the scraped articles from the DB.

const axios = require('axios');
const cheerio = require('cheerio');
const router = require('express').Router();

const db = require('../models');

router.get('/scrape', async (req, res) => {
	const url = 'https://www.nytimes.com/section/world';

	try {
		const data = await axios.get(url);
		// console.log(data.data);
		let $ = cheerio.load(data.data);
		let results = [];
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
				let link = $(elem).find('a').attr('href');

				//NOTE :: Debug
				console.log('Headline::', headline);
				console.log('Summary::', summary);
				console.log('Link::', link);
				console.log('imgSrc::', imgSrc);
				console.log('------------------------------');

				// gathers all elements and pushes it to the results array
				// results.push({
				// 	headline,
				// 	summary,
				// 	imgSrc,
				// 	link: 'https://nytimes.com/' + link,
				// });

				// inserts article into mongoDB
				await db.Article.create({
					headline,
					summary,
					link,
					imgSrc
				});

				const testArticle = await db.Article.find({headline});
				console.log('testArticle::', testArticle);
			});

		
		// console.log(results);

		// passes results back to client
		// res.send(results);


	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
