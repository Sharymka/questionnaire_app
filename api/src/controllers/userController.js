const {createUsers , findUsers, findAllUsers} = require("../services/userService");

async function signUp(req, res) {

	const { firstName, lastName, email, password } = req.body;

	try {
		const user = await createUsers(firstName, lastName, email, password);
		if(user) {
			req.session.userId = user.id;

			res.status(200).json({
				sessionId: req.sessionID,
				user: user,
			});

		}else {
			res.status(401).json({ error: "invalid email or password" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message});
	}
}

async function signIn(req, res) {

	const { email, password } = req.body;
	console.log('email', email);
	try {
		const user = await findUsers( email, password);

		console.log("Поиск пользователя с email:", user);
		if(user) {
			req.session.userId = user.id;

			res.status(200).json({
				sessionId: req.sessionID,
				user: user,
			});

		}else {

			res.status(401).json({ error: "wrong email or password" });
		}
	} catch (error) {
		console.error('Sign in error:', error);
		res.status(500).json({ error: error.message || "Internal server error" });
	}
}

async function signOut(req, res) {
	try {
		// req.session.userId = null;

		req.session.destroy((err) => {
			if (err) {
				console.error("Ошибка при уничтожении сессии:", err);
				return res.status(500).send("Ошибка сервера");
			}

			res.clearCookie("session_cookie_name");
			return res.send("Вы вышли из системы");
		});

	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getUsers(req, res) {

	const fields = req.body.fields;

	try {
		const users = await findAllUsers(fields);
		if(users) {
			res.status(201).json(users);
		}
	} catch (error) {
		res.status(500).json({ error: error.message});
	}
}

module.exports = {signUp, signIn, signOut, getUsers};
