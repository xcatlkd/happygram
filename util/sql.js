const Sequelize = require('sequelize');

let sql;

if (process.env.DATABASE_URL) {
	sql = new Sequelize(process.env.DATABASE_URL);
} 

else {
	sql = new Sequelize({
		database: process.env.DB_NAME,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		host: process.env.HOST || "localhost",
		port: 5432,
		dialect: "postgres",
	});
}

module.exports = sql;