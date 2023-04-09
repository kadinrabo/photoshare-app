const client = require("../util/database");

exports.getUsersByCScore = (req, res, next) => {
	const query = `
		SELECT usertable.* FROM usertable
		LEFT JOIN albumtable ON usertable.uid = albumtable.uid
		LEFT JOIN phototable ON albumtable.aid = phototable.aid
		LEFT JOIN commenttable ON usertable.uid = commenttable.uid
		GROUP BY usertable.uid, usertable.email, usertable.fname, usertable.lname
		ORDER BY COUNT(DISTINCT commenttable.cid) + COUNT(DISTINCT phototable.pid) DESC
		LIMIT 10;
    `;
	client.query(query, (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getAllUsers = (req, res, next) => {
	client.query("SELECT * FROM usertable;", (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getRecsByUid = (req, res, next) => {
	const uid = req.params.uid;
	const query = `
	SELECT u.*
	FROM usertable u
	JOIN hasfriend hf1 ON u.uid = hf1.fid
	JOIN hasfriend hf2 ON hf1.uid = hf2.fid
	WHERE hf2.uid = $1 AND u.uid NOT IN (
		SELECT fid FROM hasfriend WHERE uid = $1
	) AND u.uid != $1
	GROUP BY u.uid, u.email
	ORDER BY COUNT(*) DESC;
	`;
	client.query(query, [uid], (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getMayLikeByUid = (req, res, next) => {
	const maylikeuid = req.params.maylikeuid;
	const query = `
	SELECT pt.*, COUNT(*) AS common_count
	FROM PhotoTable pt
	JOIN HasAlbum ha ON pt.aid = ha.aid
	JOIN AlbumTable at ON at.aid = ha.aid
	JOIN HasTag ht ON ht.pid = pt.pid
	JOIN TagTable tt ON tt.tid = ht.tid
	WHERE at.uid != $1 AND pt.pid IN (
		SELECT pt2.pid
		FROM PhotoTable pt2
		JOIN HasTag ht2 ON ht2.pid = pt2.pid
		JOIN TagTable tt2 ON tt2.tid = ht2.tid
		WHERE tt2.tag IN (
			SELECT tt3.tag
			FROM (
				SELECT ht3.tid, COUNT(*) AS cnt
				FROM PhotoTable pt3
				JOIN HasTag ht3 ON ht3.pid = pt3.pid
				JOIN TagTable tt3 ON tt3.tid = ht3.tid
				WHERE pt3.aid IN (
					SELECT at2.aid
					FROM AlbumTable at2
					WHERE at2.uid = $1
				)
				GROUP BY ht3.tid
				ORDER BY cnt DESC
				LIMIT 5
			) AS top_tags
			JOIN TagTable tt3 ON tt3.tid = top_tags.tid
			ORDER BY top_tags.cnt DESC
		)
	)
	GROUP BY pt.pid
	ORDER BY common_count DESC
	LIMIT 5;
	`;
	client.query(query, [maylikeuid], (err, result) => {
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

exports.getUserByAid = (req, res, next) => {
	const aid = req.params.aid;
	const query = `
		SELECT * FROM usertable WHERE uid IN 
			(SELECT uid FROM albumtable WHERE aid = $1);
      `;
	client.query(query, [aid], (err, result) => {
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
	} else if (/^\S+@\S+\.\S+$/.test(search)) {
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
	} else {
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

exports.updateUserByUid = (req, res, next) => {
	const uid = req.params.uid;
	const { pass, fname, lname, dob, gender, home } = req.body;

	let query = `UPDATE usertable SET `;
	const params = [uid];

	if (pass !== "") {
		query += `pass = $2, `;
		params.push(pass);
	}
	if (fname !== "") {
		query += `fname = $${params.length + 1}, `;
		params.push(fname);
	}
	if (lname !== "") {
		query += `lname = $${params.length + 1}, `;
		params.push(lname);
	}
	if (dob !== "") {
		query += `dob = $${params.length + 1}, `;
		params.push(dob);
	}
	if (gender !== "") {
		query += `gender = $${params.length + 1}, `;
		params.push(gender);
	}
	if (home !== "") {
		query += `home = $${params.length + 1}, `;
		params.push(home);
	}
	query = query.slice(0, -2);
	query += ` WHERE uid = $1;`;

	client.query(query, params, (err) => {
		if (err) {
			return next(err);
		}
	});
	res.status(201).json({ message: "User updated successfully." });
};
