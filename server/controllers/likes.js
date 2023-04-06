const client = require("../util/database");

exports.getAllLikes = (req, res, next) => {
	client.query("SELECT * FROM liketable", (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.addLike = (req, res, next) => {
	const { pid, uid } = req.body;
	const query = `
		INSERT INTO liketable (uid) VALUES ($1) RETURNING lid
      `;
	client.query(query, [uid], (err, result) => {
		if (err) {
			return next(err);
		}
		const lid = result.rows[0].lid;
		client.query(
			"INSERT INTO haslike (pid, lid) VALUES ($1, $2)",
			[pid, lid],
			(err) => {
				if (err) {
					return next(err);
				}
				res.status(201).json({ message: "Like added successfully." });
			}
		);
	});
};
