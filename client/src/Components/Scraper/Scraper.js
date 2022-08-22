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
			console.log('Done scraping TRACER 1');
			console.log('Getting articles from database');

			await getFromDb();

			// Debug
			console.log('Application refreshed scrapeArticles()');
		} catch (err) {
			console.log('Error scraping articles');
			console.log(err);
		}
	};

	const deleteArticles = async () => {
		try {
			// Debug
			console.log('Deleting all articles');
			
			await API.deleteArticles();

			// Debug
			console.log('Done deleting TRACER 1');
			console.log('Refreshing application');

			await getFromDb();

			// Debug
			console.log('Application refreshed deleteArticles()');
		} catch (err) {
			console.log('Error deleting articles');
			console.log(err);
		}
	}

	useEffect(() => {
		getFromDb();
	}, []);

	return (
		<Container fluid="md">
			<Row>
				<Col>
					<Button
						variant="outline-primary"
						size="md"
						className="m-3"
						onClick={() => scrapeArticles()}
					>
						<h3>Scrape Articles</h3>
					</Button>					
				</Col>
				<Col>
					<Button
						variant="outline-primary"
						size="md"
						className="m-3"
						onClick={() => deleteArticles()}
					>
						<h3>Delete Articles</h3>
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
								timestamp={article.timestamp}
							/>
						);
					})}
				</Col>
			</Row>
		</Container>
	);
};

export default Scraper;
