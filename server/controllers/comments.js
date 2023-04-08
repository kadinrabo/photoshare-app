const client = require("../util/database");

exports.getAllComments = (req, res, next) => {
	client.query("SELECT * FROM commenttable", (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getCommentsByPid = (req, res, next) => {
	const pid = req.params.pid;
	const query = `
        SELECT * FROM commenttable WHERE cid IN (
            SELECT cid
            FROM hascomment
            WHERE pid = $1
        );
    `;
	client.query(query, [pid], (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.addComment = (req, res, next) => {
	const { uid, ctext, pid } = req.body;
	client.query(
		"INSERT INTO commenttable (uid, ctext) VALUES ($1, $2) RETURNING cid",
		[uid, ctext],
		(err, result) => {
			if (err) {
				return next(err);
			}
			const newCid = result.rows[0].cid;
			client.query(
				"INSERT INTO hascomment (pid, cid) VALUES ($1, $2)",
				[pid, newCid],
				(err) => {
					if (err) {
						return next(err);
					}
				}
			);
			res.status(201).json({
				message: "Comment added and hascomment table updated successfully!",
			});
		}
	);
};
