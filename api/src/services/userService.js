
const bcrypt = require("bcrypt") ;
const  User  = require('../models/user');

class UserService {
	static async createUsers(firstName, lastName, email, password) {

		const existingUser = await User.findOne({ where: { email } });

		if (existingUser) {
			throw new Error('Email is already in use');
		}

		const hashedPassword = await bcrypt.hash(password, 10);


		return  await User.create({
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: hashedPassword,
			role: 'user',
			status: 'active',
		});

	}

	static async findUsers(email,password) {
		const user = await User.findOne({where: {email}});

		if (!user) {
			throw new Error('User not found');
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('Invalid password');
		}

		return user;

	}
}

module.exports = UserService;