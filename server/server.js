const express = require("express");
const app = express();

const client = require("./util/database");
const bodyparser = require("body-parser");
const cors = require("cors");
const port = 8080;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/users", require("./routes/users"));
app.use("/photos", require("./routes/photos"));
app.use("/albums", require("./routes/albums"));
app.use("/comments", require("./routes/comments"));
app.use("/tags", require("./routes/tags"));
app.use("/likes", require("./routes/likes"));
app.use("/friends", require("./routes/friends"));

app.get("/", (req, res, next) => {
	res.send("Api running 👍");
});

app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	res.status(status).json({ message: message });
});

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
