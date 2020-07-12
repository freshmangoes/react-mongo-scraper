const axios = require('axios');
const cheerio = require('cheerio');
const router = require('express').Router();

router.get('/scrape', async (req, res) => {
	const url = 'https://www.nytimes.com/section/world';
	// const url = 'https://google.com'
	// const url = 'https://sfbay.craigslist.org/search/mcy?query=honda&sort=rel';

	try {
		const data = await axios.get(url);
		// console.log(data.data);
		let $ = cheerio.load(data.data);
		let results = [];
		$('#collection-world')
			.find('article')
			.each(function (i, elem) {
				let headline = $(elem).find('h2').text();
				let summary = $(elem).find('p').text();
				let imgSrc = $(elem).find('img').attr('src');
				let link = $(elem).find('a').attr('href');
				console.log('Headline::', headline);
				console.log('Summary::', summary);
				console.log('Link::', link);
				console.log('imgSrc::', imgSrc);
				console.log('------------------------------');
				results.push({
					headline,
					summary,
					imgSrc,
					link: url+link
				});
			});
		console.log(results);
		res.send(results);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
