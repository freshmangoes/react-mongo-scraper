// connect api endpoints here

import axios from 'axios';

export default {
	scrape: function () {
		return axios.get('/scrape');
	},

	dbArticles: function () {
		return axios.get('/dbArticles');
	},

	deleteArticles: function () {
		return axios.delete('/deleteArticles');
	},
};