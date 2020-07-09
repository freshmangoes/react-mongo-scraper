import React, { useState, useEffect } from 'react';
import API from '../../utils/API';

const Scraper = () => {
	const [state, setState] = useState({});

	const testScraper = async () => {
		try {
			const data = await API.scrape();
			console.log('Scrape.js Data::', data);
			setState(data);
		} catch (err) {
			console.log('error in Scraper.js');
			console.log(err);
		}
	};

	useEffect(() => {
		testScraper();
	});

	return <div></div>;
};

export default Scraper;
