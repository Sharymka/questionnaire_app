const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../..', '.env') });

module.exports = {
	development: {
		username: process.env.DB_ALWAYSDATA_USER,
		password: process.env.DB_ALWAYSDATA_PASSWORD,
		database: process.env.DB_ALWAYSDATA_NAME,
		host: process.env.DB_ALWAYSDATA_HOST,
		dialect: 'mysql',
		port: process.env.DB_ALWAYSDATA_PORT || 3306,
	},

};

// module.exports = {
// 	development: {
// 		username: process.env.DB_USER,
// 		password: process.env.DB_PASSWORD,
// 		database: process.env.DB_NAME,
// 		host: process.env.DB_HOST,
// 		dialect: 'mysql',
// 		port: process.env.DB_PORT || 3306,
// 	},
// 	test: {
// 		username: process.env.DB_USER,
// 		password: process.env.DB_PASSWORD,
// 		database: process.env.DB_NAME_TEST,
// 		host: process.env.DB_HOST,
// 		dialect: 'mysql',
// 		port: process.env.DB_PORT || 3306,
// 	},
// 	production: {
// 		username: process.env.DB_USER,
// 		password: process.env.DB_PASSWORD,
// 		database: process.env.DB_NAME_PROD,
// 		host: process.env.DB_HOST,
// 		dialect: 'mysql',
// 		port: process.env.DB_PORT || 3306,
// 	},
// };