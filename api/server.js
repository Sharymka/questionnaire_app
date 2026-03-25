
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const {signUp, signIn, signOut, getUsers} = require("./src/controllers/userController");
const {get, create, update, remove, getTemplateById} = require("./src/controllers/templateController");
const {getForms, createForm, getForm} = require("./src/controllers/formController");
const cloudinary = require('./src/config/cloudinaryConfig');
const {isAuthenticated} = require("./src/middlewares/isAuthenticated");
const { createAccount, createContact } = require('./src/services/salesForce');
const getAccessToken = require("./src/services/getAccessToken");
const sessionMiddleware = require("./src/config/sessionStore");
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3001;
const api = express.Router();

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const upload = multer({
	dest: 'uploads/',
	limits: { fileSize: MAX_FILE_SIZE },
	fileFilter: (_req, file, cb) => {
		if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error('Only JPEG, PNG, GIF and WebP images are allowed'));
		}
	},
});

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 20,
	standardHeaders: true,
	legacyHeaders: false,
	message: { error: 'Too many attempts, please try again later' },
});

app.use(helmet());
app.use(cors({
	origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
	credentials: true,
}));
app.use(sessionMiddleware);
app.use('/api', api);
api.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

api.post('/signUp', authLimiter, signUp);

api.post('/signIn', authLimiter, signIn);

api.post('/signOut', isAuthenticated, signOut);

api.get('/users',isAuthenticated, getUsers);

api.post('/template',isAuthenticated, create);

api.get('/templates', get);

api.get('/template/:id', getTemplateById);

api.post('/template/:id',isAuthenticated, update);

api.delete('/template/:id', isAuthenticated, remove);

api.get('/forms',isAuthenticated, getForms);

api.get('/form/:id',isAuthenticated, getForm);

api.post('/form',isAuthenticated, createForm);



api.post('/upload', isAuthenticated, upload.single('image'), async (req, res) => {
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
		console.error('Upload error:', error);
		res.status(500).json({ error: 'File upload failed' });
	}
});

app.post('/api/salesforce/createCustomer', isAuthenticated, async (req, res) => {
	const { userData } = req.body;

	try {
		const accessToken = await getAccessToken(
			process.env.SF_CLIENT_ID,
			process.env.SF_CLIENT_SECRET,
			process.env.SF_USERNAME,
			process.env.SF_PASSWORD,
		);

		const accountId = await createAccount(accessToken, {
			name: userData.companyName,
			industry: userData.industry,
		});

		const contactId = await createContact(accessToken, {
			firstName: userData.firstName,
			lastName: userData.lastName,
			Email: userData.email,
		}, accountId);

		res.status(200).json({ message: 'Account created successfully', accountId, contactId });
	} catch (error) {
		console.error('Salesforce error:', error.message);
		res.status(500).json({ message: 'Error creating Account', error: error.message });
	}
});


app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
