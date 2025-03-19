const mysql = require('mysql2');
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);


const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: 3307,
});

const sessionStore = new MySQLStore({
	clearExpired: true,
	checkExpirationInterval: 900000,
	schema: {
		tableName: "sessions",
		columnNames: {
			session_id: "session_id",
			expires: "expires",
			data: "data",
		}

	}
}, db);

const sessionMiddleware = session({
	key: "session_cookie_name",
	secret: "your_secret_key",
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
		httpOnly: true,  // Защита от XSS
		// secure: true,     // Только по HTTPS
		signed: true      // Подпись sessionId
	} // 24 часа
});

module.exports = sessionMiddleware;
