
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./src/config/db');
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const {signUp, signIn, getUsers} = require("./src/controllers/userController");
const {create} = require("./src/controllers/templateController");
const session = require('express-session');
const isAuthenticated = require("./src/middlewares/isAuthenticated");


const app = express();
const port = process.env.PORT || 3001;
const api = express.Router();

app.use(session({
	secret: 'supersecretkey',
	resave: false,
	saveUninitialized: false,
	rolling: true,
	cookie: {
		maxAge: 3600000,
		secure: false,
		httpOnly: true,
		sameSite: 'lax'
	}
}));

api.use(express.json());

app.use('/api', api);

app.use(express.static(path.join(__dirname, 'build')));

api.post('/signUp', signUp);

api.post('/signIn', signIn);

api.post('/users', getUsers);

api.post('/template', create);


app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
