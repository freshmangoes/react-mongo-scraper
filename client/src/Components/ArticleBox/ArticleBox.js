import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ArticleBox = (props) => {
	const { headline, summary, link, imgSrc } = props;
	return (
		<div>
			<Card className='m-3 text-left'>
				<Card.Img
					variant="top"
					src={imgSrc}
					width="50%"
					height="50%"
					loading="lazy"
				/>
				<Card.Body>
					<Card.Title>{headline}</Card.Title>
					<Card.Text>{summary}</Card.Text>
					<Button variant="outline-info">
						<a href={link}>Link to article</a>
					</Button>
				</Card.Body>
			</Card>
			{/* <h2>{headline}</h2>
			<p>{summary}</p>
			<p>
				<a href={link}>Link to article</a>
			</p>
			<img src={imgSrc} loading="lazy" width="50%" height="50%" /> */}
		</div>
	);
};

export default ArticleBox;
