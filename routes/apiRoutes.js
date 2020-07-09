const axios = require('axios');
const router = require('express').Router();

router.get('/scrape', async (req, res) => {
	const url = 'http://www.imdb.com/title/tt1229340/';

	try {
		const response = await axios.get(url);
		console.log(response);
		res.json(response);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
