const mysql = require('mysql2');
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);


const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.NODE_ENV === 'dev'? 3307 : 3306,
});

// const db = mysql.createConnection({
// 	host: process.env.DB_ALWAYSDATA_HOST,
// 	user: process.env.DB_ALWAYSDATA_USER,
// 	password: process.env.DB_ALWAYSDATA_PASSWORD,
// 	database: process.env.DB_ALWAYSDATA_NAME,
// 	port: process.env.DB_ALWAYSDATA_PORT,
// });

db.connect((err) => {
	if (err) {
		console.error('Error bd connection :', err);
	} else {
		console.log('bd connection set up successfully');
	}
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
		secure: true,
		signed: true      // Подпись sessionId
	} // 24 часа
});

module.exports = sessionMiddleware;
