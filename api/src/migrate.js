// migrate.js
const sequelize = require('./config/db');
const User = require('./models/user');


async function migrate() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		// Создаем таблицу
		await User.sync({ force: true });
		console.log('User table has been created successfully.');

	} catch (error) {
		console.error('Unable to connect to the database:', error);
	} finally {
		await sequelize.close();
	}
}

migrate();
