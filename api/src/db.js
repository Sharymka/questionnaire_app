const mysql = require('mysql2');

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: 'password',
	database: process.env.DB_NAME,
	port: 3307
});


// Проверка подключения
db.connect(err => {
	if (err) {
		console.error('Ошибка подключения к базе данных:', err.message);

	} else {
		console.log('Подключение к базе данных успешно выполнено');
	}
});

module.exports = db;