
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./src/config/db');
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const createUser = require("./src/controllers/userController");


const app = express();
const port = process.env.PORT || 3001;
const api = express.Router();
api.use(express.json());

app.use('/api', api);

app.use(express.static(path.join(__dirname, 'build')));

api.post('/signUp', createUser);


app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
