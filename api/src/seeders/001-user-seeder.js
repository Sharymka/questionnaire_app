'use strict';

const bcrypt = require('bcrypt'); // Для хеширования паролей
const { faker } = require('@faker-js/faker');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const users = [];
		const hashedPassword = await bcrypt.hash('123', 10); // Хешируем один и тот же пароль для всех

		users.push({
			first_name: 'Ivan',
			last_name: 'Ivanov',
			email: 'ivan@mail.ru',
			password: hashedPassword,
			role: 'admin', // Первый пользователь будет администратором
			status: 'active',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		for (let i = 0; i < 10; i++) {
			users.push({
				first_name: faker.person.firstName(),
				last_name: faker.person.lastName(),
				email: faker.internet.email(),
				password: hashedPassword,
				role: i === 0 ? 'admin' : 'user', // Первый пользователь будет администратором
				status: 'active',
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		return queryInterface.bulkInsert('users', users, {});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('users', null, {});
	}
};
