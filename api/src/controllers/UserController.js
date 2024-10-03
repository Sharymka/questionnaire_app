const User = require('../models/user');

async function createUser(req, res) {
	const { firstName, lastName, email, password } = req.body;
	try {
		const user = await User.create({
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password,
			role: 'user',
			status: 'active',
		});
		res.status(201).json(user);  // Отправляем успешный ответ с данными пользователя
	} catch (error) {
		res.status(500).json({ error: 'Ошибка создания пользователя' });
	}
}

module.exports = { createUser };
