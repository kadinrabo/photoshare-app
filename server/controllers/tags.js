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
