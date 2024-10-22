
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./src/config/db');
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const {signUp, signIn, getUsers} = require("./src/controllers/userController");
const {get, create, update, remove} = require("./src/controllers/templateController");
const session = require('express-session');
const isAuthenticated = require("./src/middlewares/isAuthenticated");
const cloudinary = require('./src/config/cloudinaryConfig');



const app = express();
const port = process.env.PORT || 3001;
const api = express.Router();

//временное хранилище файлов пришедших от клиента, это мидлварка которая перехватывает те запросы где она прописана
const multer = require('multer');
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

// cloudinary.config({
// 	cloudinary_url: process.env.CLOUDINARY_URL,
// 	cloud_name: 'dewxfivxh',
// 	api_key: '897915434141827',
// 	api_secret: '3gW-22XbpEgNvqg2GtMcjoNAvxM'
// });

api.use(express.json());

app.use('/api', api);

app.use(express.static(path.join(__dirname, 'build')));

api.post('/signUp', signUp);

api.post('/signIn', signIn);

api.post('/users', getUsers);

api.get('/template', get);

api.post('/template', create);

api.post('/template/:id', update);

api.delete('/template/:id', remove);

let uploadStatus = {}; // объект для отслеживания статусов загрузки

api.post('/upload', upload.single('image'), async (req, res) => {
	try {
		const file = req.file;

		if (!file) {
			return res.status(400).json({ error: 'No file uploaded' });
		}

		const uploadId = Date.now(); // уникальный идентификатор загрузки
		uploadStatus[uploadId] = 'processing';

		// Отправляем ответ сразу после получения файла
		res.status(202).json({ message: 'File received, processing upload', uploadId });

		// Загружаем файл асинхронно в Cloudinary
		const result = await cloudinary.uploader.upload(file.path, {
			upload_preset: 'questionnaire'
		});

		uploadStatus[uploadId] = { url: result.secure_url }; // сохраняем URL после загрузки

	} catch (error) {
		console.error('Ошибка при загрузке:', error);
		uploadStatus[uploadId] = 'error'; // сохраняем статус ошибки
	}
});

// Маршрут для проверки статуса загрузки
api.get('/upload-status/:id', (req, res) => {
	const uploadId = req.params.id;
	const status = uploadStatus[uploadId];

	if (status) {
		res.status(200).json(status);
	} else {
		res.status(404).json({ error: 'Upload not found' });
	}
});


app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
