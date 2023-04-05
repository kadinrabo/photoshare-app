const client = require("../util/database");

// Handler for http://localhost:8080/tags
exports.getPopularTags = (req, res, next) => {
	const query = `
		SELECT t.*
		FROM hastag ht
		JOIN tagtable t ON ht.tid = t.tid
		GROUP BY ht.tid, t.tag, t.tid
		ORDER BY COUNT(*) DESC
		LIMIT 10;
	`;

	client.query(query, (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

// tags: get all unique tags on photos by a user uid
exports.getAllUniqueTagsByUid = (req, res, next) => {
	const uid = req.params.uid;
	const query = `
		SELECT tag FROM tagtable WHERE tid in
			(SELECT tid FROM hastag WHERE pid in
				(SELECT pid FROM phototable WHERE aid in
					(SELECT aid FROM albumtable WHERE uid = $1))
		);
	`;

	client.query(query, [uid], (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getTagsByPid = (req, res, next) => {
	const pid = req.params.pid;
	const query = `
        SELECT * FROM tagtable WHERE tid IN (
            SELECT tid FROM hastag WHERE pid = $1
        );
    `;
	client.query(query, [pid], (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.addTag = (req, res, next) => {
	const { tag } = req.body;
	const pid = req.params.pid;
	client.query(
		"SELECT tid FROM tagtable WHERE tag = $1",
		[tag],
		(err, result) => {
			if (err) {
				return next(err);
			}
			if (result.rowCount > 0) {
				// Tag already exists, use the existing tid to insert into hastag
				const tid = result.rows[0].tid;
				client.query(
					"INSERT INTO hastag (pid, tid) VALUES ($1, $2)",
					[pid, tid],
					(err) => {
						if (err) {
							return next(err);
						}
						res.status(201).json({
							message: "hastag table updated successfully!",
						});
					}
				);
			} else {
				// Tag doesn't exist, insert new tag and hastag rows
				client.query(
					"INSERT INTO tagtable (tag) VALUES ($1) RETURNING tid",
					[tag],
					(err, result) => {
						if (err) {
							return next(err);
						}
						const newTid = result.rows[0].tid;
						client.query(
							"INSERT INTO hastag (pid, tid) VALUES ($1, $2)",
							[pid, newTid],
							(err) => {
								if (err) {
									return next(err);
								}
								res.status(201).json({
									message: "Tag added and hastag table updated successfully!",
								});
							}
						);
					}
				);
			}
		}
	);
};
