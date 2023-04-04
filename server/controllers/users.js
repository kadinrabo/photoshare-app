const client = require("../util/database");

// Handler for http://localhost:8080/users
exports.getAllUsers = (req, res, next) => {
	client.query("SELECT * FROM usertable", (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getUserByPid = (req, res, next) => {
	const pid = req.params.pid;
	const query = `
		SELECT * FROM usertable WHERE uid IN 
			(SELECT uid FROM albumtable WHERE aid IN (
				SELECT aid
				FROM contains
				WHERE pid = $1));
      `;
	client.query(query, [pid], (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getUserHasLikeByPid = (req, res, next) => {
	const pid = req.params.haslikepid;
	const query = `
		SELECT * FROM usertable WHERE uid IN (
			SELECT uid
			FROM liketable
			WHERE lid IN (
				SELECT lid
				FROM haslike
				WHERE pid = $1
			)
		);
      `;
	client.query(query, [pid], (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getUsersBySearch = (req, res, next) => {
	const search = req.params.search;
	if (/^\d+$/.test(search)) {
		const query = `
    SELECT *
        FROM usertable
        WHERE uid = $1;
      `;
		client.query(query, [search], (err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result.rows);
		});
	}
	// Check if the search parameter is an email
	else if (/^\S+@\S+\.\S+$/.test(search)) {
		const query = `
        SELECT *
        FROM usertable
        WHERE email = $1;
      `;
		client.query(query, [search], (err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result.rows);
		});
	}
	// Otherwise, treat the search parameter as regular text
	else {
		const query = `
        SELECT * FROM usertable WHERE fname ILIKE '%' || $1 || '%' OR lname ILIKE '%' || $1 || '%' OR concat(fname, ' ', lname) ILIKE '%' || $1 || '%';
      `;
		client.query(query, [`%${search}%`], (err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result.rows);
		});
	}
};

// Handler for http://localhost:8080/users/
exports.createNewUser = (req, res, next) => {
	const { email, fname, lname, pass, dob, gender, home } = req.body;
	client.query(
		"INSERT INTO usertable (email, fname, lname, pass, dob, gender, home) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		[email, fname, lname, pass, dob, gender, home],
		(err, result) => {
			if (err) {
				return next(err);
			}
			res.status(201).json({ message: "User created successfully." });
		}
	);
};
