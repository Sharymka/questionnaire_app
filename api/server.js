
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const {signUp, signIn, signOut, getUsers} = require("./src/controllers/userController");
const {get, create, update, remove, getTemplateById} = require("./src/controllers/templateController");
const {getForms, createForm, getForm} = require("./src/controllers/formController");
const cloudinary = require('./src/config/cloudinaryConfig');
const {isAuthenticated} = require("./src/middlewares/isAuthenticated");
const { createAccount, createContact } = require('./src/services/salesForce');

const app = express();
const port = process.env.PORT || 3001;
const api = express.Router();
const multer = require('multer');
const getAccessToken = require("./src/services/getAccessToken");
const sessionMiddleware = require("./src/config/sessionStore");
const upload = multer({ dest: 'uploads/' });

app.use(sessionMiddleware);
app.use('/api', api);
api.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

api.post('/signUp', signUp);

api.post('/signIn', signIn);

api.post('/signOut', isAuthenticated, signOut);

api.get('/users',isAuthenticated, getUsers);

api.post('/template',isAuthenticated, create);

api.get('/templates', get);

api.get('/template/:id', getTemplateById);

api.post('/template/:id',isAuthenticated, update);

api.delete('/template/:id', remove);

api.get('/forms',isAuthenticated, getForms);

api.get('/form/:id',isAuthenticated, getForm);

api.post('/form',isAuthenticated, createForm);



api.post('/upload', upload.single('image'), async (req, res) => {
	try {
		const file = req.file;

		if (!file) {
			return res.status(400).json({ error: 'No file uploaded' });
		}
		const result = await cloudinary.uploader.upload(file.path, {
			upload_preset: 'questionnaire'
		});
		res.status(202).json({ message: 'File received, processing upload', url: result.secure_url });

	} catch (error) {
		console.error('Ошибка при загрузке:', error);
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
	console.log(path.join(__dirname, 'build', 'index.html'));
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
