import React from 'react';

const Article = (props) => {
	const { headline, summary, link, imgSrc } = props;
	return (
		<div>
			<h2>{headline}</h2>
			<p>{summary}</p>
			<p>
				<a href={link}>Link to article</a>
			</p>
			<img src={imgSrc} loading="lazy" width="50%" height="50%" />
		</div>
	);
};

export default Article;
