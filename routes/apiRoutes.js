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
		// scrapes through the #collection-world id
		$('#collection-world')
			// finds each article element
			.find('article')
			// scrapes through each article element, using elem as 'each'
			.each(function (i, elem) {
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
				results.push({
					headline,
					summary,
					imgSrc,
					link: 'https://nytimes.com/' + link,
				});
			});
		console.log(results);

		// passes results back to client
		res.send(results);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
