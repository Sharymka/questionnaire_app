const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

const path = require("path");
//
dotenv.config({ path: path.join(__dirname, '../../..', '.env') });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
	port: process.env.NODE_ENV === 'dev'? 3307 : 3306,
	logging: false,
	dialectOptions: {
		charset: 'utf8mb4',
	},
});

// const sequelize = new Sequelize(process.env.DB_ALWAYSDATA_NAME, process.env.DB_ALWAYSDATA_USER, process.env.DB_ALWAYSDATA_PASSWORD, {
// 	host: process.env.DB_ALWAYSDATA_HOST,
// 	dialect: 'mysql',
// 	port: process.env.DB_ALWAYSDATA_PORT,
// 	dialectOptions: {
// 		charset: 'utf8mb4',
// 		connectTimeout: 10000,
// 	},
// 	logging: false,
// });

module.exports = sequelize;
