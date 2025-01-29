const dotenv = require('dotenv');
const path = require("path");
const {Sequelize} = require("sequelize");
dotenv.config({ path: path.join(__dirname, '../../..', '.env') });


const sequelize = new Sequelize(process.env.DB_ALWAYSDATA_NAME, process.env.DB_ALWAYSDATA_USER, process.env.DB_ALWAYSDATA_PASSWORD, {
	host: process.env.DB_ALWAYSDATA_HOST,
	dialect: 'mysql',
	port: process.env.DB_ALWAYSDATA_PORT,
	dialectOptions: {
		charset: 'utf8mb4',
		connectTimeout: 10000,
	},
});

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
