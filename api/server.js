
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./src/config/db');
// const db = require('./src/config/alwaysData');
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const {signUp, signIn, signOut, getUsers} = require("./src/controllers/userController");
const {get, create, update, remove, getTemplateById} = require("./src/controllers/templateController");
const {getForm, createForm, updateFrom, removeForm} = require("./src/controllers/formController");
const session = require('express-session');
const cloudinary = require('./src/config/cloudinaryConfig');
const {isAuthenticated} = require("./src/middlewares/isAuthenticated");
const { createAccount, createContact } = require('./src/services/salesForce');

const app = express();
const port = process.env.PORT || 3001;
const api = express.Router();
const multer = require('multer');
const getAccessToken = require("./src/services/getAccessToken");
const upload = multer({ dest: 'uploads/' });

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

api.post('/signOut', isAuthenticated, signOut);

api.post('/users',isAuthenticated, getUsers);

api.post('/template',isAuthenticated, create);

api.get('/templates',isAuthenticated, get);

api.get('/template/:id',isAuthenticated, getTemplateById);

api.post('/template/:id',isAuthenticated, update);

api.delete('/template/:id', remove);

api.get('/form',isAuthenticated, getForm);

let uploadStatus = {};

api.post('/upload', upload.single('image'), async (req, res) => {
	try {
		const file = req.file;

		if (!file) {
			return res.status(400).json({ error: 'No file uploaded' });
		}

		const uploadId = Date.now();
		uploadStatus[uploadId] = 'processing';

		res.status(202).json({ message: 'File received, processing upload', uploadId });

		const result = await cloudinary.uploader.upload(file.path, {
			upload_preset: 'questionnaire'
		});

		uploadStatus[uploadId] = { url: result.secure_url };

	} catch (error) {
		console.error('Ошибка при загрузке:', error);
		uploadStatus[uploadId] = 'error';
	}
});

api.get('/upload-status/:id', (req, res) => {
	const uploadId = req.params.id;
	const status = uploadStatus[uploadId];

	if (status) {
		res.status(200).json(status);
	} else {
		res.status(404).json({ error: 'Upload not found' });
	}
});

app.post('/api/salesforce/createCustomer', async (req, res) => {
	const clientId = '3MVG9PwZx9R6_Ure2CRnVHgtfz_gZgBgOuJOz4lrrCKOvOqhAk6q.7zwHT6ts0YHgLHCVeGHQbWsAKMjCmqoM';
	const clientSecret = '99BC277BF998E82DAA534F2C026C57C01177B92A227D6A652780C9416CF0E85F';
	const username = 'svetlanakh@company.itransition';
	const password = 'Ferdenandka13\!CfkcCQMXwUFnScxNyUC3XCpUb';

	const { userData } = req.body;

	try {
		const accessToken = await getAccessToken(clientId, clientSecret, username, password);

		console.log(accessToken);

		const accountId = await createAccount(accessToken, {
			name: userData.companyName,
			industry: userData.industry,
		});

		const contactId = await createContact(accessToken, {
			firstName: userData.firstName,
			lastName: userData.lastName,
			Email: userData.email,
		}, accountId);

		res.status(200).send({ message: 'Account created successfully', accountId, contactId });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Error creating Account', error: error.message });
	}
});


app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
