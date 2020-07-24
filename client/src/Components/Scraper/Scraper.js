import React, { useState, useEffect } from 'react';
import ArticleBox from '../ArticleBox/ArticleBox';
import API from '../../utils/API';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
			// Debug
			console.log('Scraping for new articles...');

			await API.scrape();

			// Debug
			console.log('Done :)');
			console.log('Getting articles from database...');

			await getFromDb();

			// Debug
			console.log('Done :)');
		} catch (err) {
			console.log('Error scraping articles');
			console.log(err);
		}
	};

	useEffect(() => {
		getFromDb();
	}, []);

	return (
		<Container fluid="md">
			<Row>
				<Col>
					<Button
						variant="outline-primary"
						size="lg"
						className="m-3"
						onClick={() => scrapeArticles()}
					>
						<h1>Scrape for New Articles</h1>
					</Button>
				</Col>
			</Row>
			{/* maps through array */}
			<Row>
				<Col>
					{state.map((article) => {
						return (
							<ArticleBox
								headline={article.headline}
								summary={article.summary}
								link={article.link}
								imgSrc={article.imgSrc}
							/>
						);
					})}
				</Col>
			</Row>
		</Container>
	);
};

export default Scraper;
