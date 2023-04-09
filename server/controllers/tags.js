const client = require("../util/database");

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

exports.getAllTags = (req, res, next) => {
	const query = `SELECT * from tagtable;`;

	client.query(query, (err, result) => {
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

exports.getTagsByQuery = (req, res, next) => {
	const qry = req.params.qry;

	if (qry.split(",").length === 1) {
		const search = "%" + "#" + req.params.qry + "%";
		const query = `SELECT * FROM tagtable WHERE tag ILIKE $1;`;
		client.query(query, [search], (err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result.rows);
		});
	} else if (qry.split(",").length > 1) {
		const tags = qry.split(",");
		const search = tags.map((t) => "%" + "#" + t.trim() + "%");
		const query = `SELECT * FROM tagtable WHERE tag ILIKE ANY ($1);`;
		client.query(query, [search], (err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result.rows);
		});
	}
};

exports.getAllUniqueTagsByUid = (req, res, next) => {
	const uid = req.params.uid;
	const query = `
		SELECT * FROM tagtable WHERE tid in
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

exports.addTag = (req, res, next) => {
	const { tag } = req.body;
	const pid = req.params.pid;
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
};
