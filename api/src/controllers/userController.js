const User = require('../models/user');
const {createUsers , findUsers, findAllUsers} = require("../services/userService");

async function signUp(req, res) {

	const { firstName, lastName, email, password } = req.body;
	console.log(firstName, lastName, email, password);
	try {
		const user = await createUsers(firstName, lastName, email, password);
		if(user) {
			console.log('user.id' + user.id);
			req.session.userId = user.id;
			console.log('session.userId' + req.session.userId);
			res.status(201).json(user);
		}
	} catch (error) {
		res.status(500).json({ error: error.message});
	}
}

async function signIn(req, res) {
	const { email, password } = req.body;
	try {
		const user = await findUsers( email, password);
		if(user) {
			console.log('user.id - ' + user.id);
			req.session.userId = user.id;
			res.status(200).json({
				sessionId: req.sessionID,
				user: user,
			});
		}else {
			res.status(401).json({ error: "Неверный email или пароль" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message});
	}
}

async function signOut(req, res) {
	try {
		req.session.userId = null;
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getUsers(req, res) {

	const fields = req.body.fields;

	try {
		const users = await findAllUsers(fields);
		if(users) {
			// req.session.userId = users.id;
			res.status(201).json(users);
		}
	} catch (error) {
		res.status(500).json({ error: error.message});
	}
}

module.exports = {signUp, signIn, signOut, getUsers};
