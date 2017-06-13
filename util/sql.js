const express = require('express');
const Sequelize = require('sequelize');

const sql = new Sequelize({
	database: process.env.DB_NAME,
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
	host: process.env.HOST || "localhost",
	port: process.env.PORT || 5432,
	dialect: "postgres"
});

module.exports = sql;
