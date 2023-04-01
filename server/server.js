// Turn on the express app
const express = require("express");
const app = express();

// Include the database client and set port to listen on
const client = require("./util/database");
const bodyparser = require("body-parser");
const cors = require("cors");
const port = 8080;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Set a route for http://localhost:8080/users
app.use("/users", require("./routes/users"));

// Set a route for http://localhost:8080/photos
app.use("/photos", require("./routes/photos"));

// Set a route for http://localhost:8080/albums
app.use("/albums", require("./routes/albums"));

// Set a route for http://localhost:8080/comments
app.use("/comments", require("./routes/comments"));

// Set a route for http://localhost:8080/tags
app.use("/tags", require("./routes/tags"));

// Set a route for http://localhost:8080/likes
app.use("/likes", require("./routes/likes"));

// Just show a message for http://localhost:8080/
app.get("/", (req, res, next) => {
	res.send("Api running 👍");
});

// Error handling
app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	res.status(status).json({ message: message });
});

// Connect to the database using the client and have the express app api listen for requests
setTimeout(() => {
	client
		.connect()
		.then(() => {
			console.log("Connected to Postgres client successfully!");

			app.listen(port, () => {
				console.log(`Server running on port ${port}`);
			});
		})
		.catch((err) => {
			console.error("Error connecting to Postgres client:", err);
		});
}, 5000);
