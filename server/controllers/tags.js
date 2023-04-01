const client = require("../util/database");

// Handler for http://localhost:8080/tags
exports.getAllTags = (req, res, next) => {
	client.query("SELECT * FROM tagtable", (err, result) => {
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
				}
			);
			res.status(201).json({
				message: "Tag added and hastag table updated successfully!",
			});
		}
	);
};
