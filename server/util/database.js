const { Client } = require("pg");

const client = new Client({
	password: "root",
	user: "root",
	host: "postgres",
	port: "5432",
	database: "root",
});

module.exports = client;
