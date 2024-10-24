// migrate.js
const sequelize = require('../config/db');
const { User, Template, Form } = require('../models');

async function migrate() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		await User.sync({ alter:true });
		console.log('Users table has been created successfully.');

		await Template.sync({ alter:true });
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
