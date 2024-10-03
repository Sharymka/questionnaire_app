const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

const path = require("path");
dotenv.config({ path: path.join(__dirname, '../../..', '.env') });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
	port: 3307,
});

module.exports = sequelize;
