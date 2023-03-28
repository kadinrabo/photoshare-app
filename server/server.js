const { Client } = require("pg");
const express = require("express");
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
  port: "5432",
  database: "root",
});

setTimeout(() => {
  client.connect()
  .then(() => {
    console.log("Connected to Postgres client successfully!");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Error connecting to Postgres client:", err);
  });
}, 5000);

app.get("/", async (req, res) => {
  const results = await client
    .query("SELECT * FROM UserTable")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});