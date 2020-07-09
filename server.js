const express = require('express');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
const root = require('path').join(__dirname, 'client', 'build');
app.use(express.static(root));

// use apiRoutes
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
	res.sendFile('index.html', {
		root,
	});
});

app.listen(PORT, () => {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
});
