const sequelize = require('../config/db');
const { User, Template, Form } = require('../models');

async function migrate() {
	try {
		console.log('Параметры подключения:', {
			DB_NAME: process.env.DB_NAME,
			DB_USER: process.env.DB_USER,
			DB_HOST: process.env.DB_HOST,
			DB_PORT: process.env.DB_PORT,
		});
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		await User.sync({ force:true });
		console.log('Users table has been created successfully.');

		await Template.sync({ force:true });
		console.log('Templates table has been created successfully.');

		await Form.sync({ force:true });
		console.log('Form table has been created successfully.');

	} catch (error) {
		console.error('Unable to connect to the database:', error);
	} finally {
		await sequelize.close();
	}
}

migrate();
