// const sequelize = require('../config/db');
const sequelize = require('../config/alwaysData');
const { User, Template, Form } = require('../models');

async function migrate() {
	try {
		console.log('Параметры подключения:', {
			DB_NAME: process.env.DB_ALWAYSDATA_NAME,
			DB_USER: process.env.DB_ALWAYSDATA_USER,
			DB_HOST: process.env.DB_ALWAYSDATA_HOST,
			DB_PORT: process.env.DB_ALWAYSDATA_PORT,
		});
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		await User.sync({ alter:true });
		console.log('Users table has been created successfully.');

		await Template.sync({ alter:true });
		console.log('Templates table has been created successfully.');

		await Form.sync({ alter:true });
		console.log('Form table has been created successfully.');

	} catch (error) {
		console.error('Unable to connect to the database:', error);
	} finally {
		await sequelize.close();
	}
}

migrate();
