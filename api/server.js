
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });


const app = express();
const port = process.env.PORT || 3001;
const api = express.Router();
const db = require('./src/db');

app.use('/api', api);
api.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

api.get('/generate', (req, res) => {

	res.json('hello world!');
});

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
