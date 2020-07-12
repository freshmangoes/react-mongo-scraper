import React, { useState, useEffect } from 'react';
import API from '../../utils/API';

const Scraper = () => {
	const [state, setState] = useState([]);

	const testScraper = async () => {
		try {
			// gets response from API endpoint '/scrape/
			const response = await API.scrape();
			console.log('response.data::', ...response.data);
			// sets state to response
			setState([...response.data]);
		} catch (err) {
			console.log('error in Scraper.js');
			console.log(err);
		}
	};

	const printState = () => {
		// iterating through state array
		for (let i = 0; i < state.length; i++) {
			console.log(`Headline:: ${state[i].headline}
			\nSummary:: ${state[i].summary}`);
		}
	};

	useEffect(() => {
		testScraper();
	}, []);

	return (
		<div>
			{/* maps through array */}
			{state.map((article) => {
				return (
					<div>
						{/* outputs headline, summary, and link from state array */}
						<h2>{article.headline}</h2>
						<p>{article.summary}</p>
						<a href={article.link}>{article.link}</a>
					</div>
				);
			})}
		</div>
	);
};

export default Scraper;
