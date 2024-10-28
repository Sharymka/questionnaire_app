const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require("path");
const {Sequelize} = require("sequelize");
dotenv.config({ path: path.join(__dirname, '../../..', '.env') });


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
	port: process.env.DB_PORT,
	dialectOptions: {
		connectTimeout: 10000,
	},
});

const testConnection = async () => {
	try {
		console.log('Параметры подключения:', {
			DB_NAME: process.env.DB_NAME,
			DB_USER: process.env.DB_USER,
			DB_HOST: process.env.DB_HOST,
			DB_PORT: process.env.DB_PORT,
		});
		await sequelize.authenticate();
		console.log('Подключение к базе данных успешно.');
	} catch (error) {
		console.error('Ошибка подключения к базе данных:', error);
	}
};

// Вызов функции для проверки подключения
testConnection();
module.exports = sequelize;

// async function connectToDatabase() {
// 	try {
// 		const connection = await mysql.createConnection({
// 			host: process.env.DB_HOST,
// 			port: process.env.DB_PORT,
// 			user: process.env.DB_USER,
// 			password: process.env.DB_PASSWORD,
// 			database: process.env.DB_NAME,
// 		});
// 		console.log('Успешное подключение к базе данных');
// 		return connection;
// 	} catch (err) {
// 		console.error('Ошибка подключения:', err);
// 		throw err;
// 	}
// }

// connectToDatabase();
