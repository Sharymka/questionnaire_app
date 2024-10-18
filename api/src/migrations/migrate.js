// migrate.js
const sequelize = require('../config/db');
const User = require('../models/user');
const Template = require('../models/template');


async function migrate() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		// Создаем таблицу
		await User.sync({ alter:true });
		console.log('Users table has been created successfully.');

		await Template.sync({ force:true });
		console.log('Templates table has been created successfully.');

	} catch (error) {
		console.error('Unable to connect to the database:', error);
	} finally {
		await sequelize.close();
	}
}

migrate();
