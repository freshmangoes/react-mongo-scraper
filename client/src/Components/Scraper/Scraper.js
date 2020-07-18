import React, { useState, useEffect } from 'react';
import Article from '../Article/Article';
import API from '../../utils/API';

const Scraper = () => {
	const [state, setState] = useState([]);

	const getFromDb = async () => {
		try {
			// gets response from API endpoint '/scrape/
			const response = await API.dbArticles();

			// sets state to response
			setState([...response.data]);
		} catch (err) {
			console.log('error in Scraper.js');
			console.log(err);
		}
	};

	const scrapeArticles = async () => {
		try {
			console.log('Scraping for new articles...');
			await API.scrape();
			console.log('Done :)');
			console.log('Getting articles from database...');
			const dbRes = await API.dbArticles();
			console.log('Done :)');
			setState([...dbRes.data]);
		} catch (err) {
			console.log('Error scraping articles');
			console.log(err);
		}
	};

	// TODO :: this currently just calls getFromDb(), which will eventually render data from the DB instead of directly scraped data
	// useEffect(() => {
	// 	getFromDb();
	// }, []);

	return (
		<div>
			<button onClick={() => scrapeArticles()}>
				<h1>Scrape for New Articles</h1>
			</button>
			{/* maps through array */}
			{state.map((article) => {
				return (
					<Article
						headline={article.headline}
						summary={article.summary}
						link={article.link}
						imgSrc={article.imgSrc}
					/>
				);
			})}
		</div>
	);
};

export default Scraper;
