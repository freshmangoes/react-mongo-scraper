import React, { useState, useEffect } from 'react';
import API from '../../utils/API';

const Scraper = () => {
	const [state, setState] = useState([]);

	const testScraper = async () => {
		try {
			// gets response from API endpoint '/scrape/
			const response = await API.dbArticles();

			// NOTE :: DEBUG
			console.log('response.data::', ...response.data);

			// sets state to response
			setState([...response.data]);
		} catch (err) {
			console.log('error in Scraper.js');
			console.log(err);
		}
	};

	// NOTE :: DEBUG
	// ---------------------------------
	const printState = () => {
		// iterating through state array
		for (let i = 0; i < state.length; i++) {
			console.log(`Headline:: ${state[i].headline}
			\nSummary:: ${state[i].summary}`);
		}
	};
	// ---------------------------------

	// TODO :: this currently just calls testScraper(), which will eventually render data from the DB instead of directly scraped data
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
