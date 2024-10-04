const User = require('../models/user');
const {createUsers} = require("../services/userService");

async function createUser(req, res) {

	const { firstName, lastName, email, password } = req.body;
	console.log(firstName, lastName, email, password);
	try {
		const user = await createUsers(firstName, lastName, email, password);
		if(user) {
			res.status(201).json(user);
		}
	} catch (error) {
		res.status(500).json({ error: error.message});
	}
}

module.exports = createUser;
