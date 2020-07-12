import React, { useState, useEffect } from 'react';
import API from '../../utils/API';

const Scraper = () => {
	const [state, setState] = useState([]);

	const testScraper = async () => {
		try {
			const response = await API.scrape();
			console.log('response.data::', ...response.data);
			setState([...response.data]);
		} catch (err) {
			console.log('error in Scraper.js');
			console.log(err);
		}
	};

	const printState = () => {

	}

	useEffect(() => {
		testScraper();
	}, []);

return (
	<div>
		{console.log(state)}
	</div>);
};

export default Scraper;
