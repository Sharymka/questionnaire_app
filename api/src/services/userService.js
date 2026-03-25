
const bcrypt = require("bcrypt") ;
const  User  = require('../models/user');

class UserService {

	static async findAllUsers(fields = []) {

		const attributes = fields.length > 0 ? fields : {exclude: ['password']};

		const users = await User.findAll({
			attributes: attributes,
		});
		if (!users || users.length === 0) {
			throw new Error('Users not found');
		}
		return users;
	}

	static async createUsers(firstName, lastName, email, password) {

		const existingUser = await User.findOne({ where: { email } });

		if (existingUser) {
			throw new Error('Email is already in use');
		}

		const hashedPassword = await bcrypt.hash(password, 10);


		const user = await User.create({
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: hashedPassword,
			role: 'user',
			status: 'active',
		});

		const { password: _, ...userWithoutPassword } = user.toJSON();
		return userWithoutPassword;

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

		const { password: _, ...userWithoutPassword } = user.toJSON();
		return userWithoutPassword;

	}
}

module.exports = UserService;