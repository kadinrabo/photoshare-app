const client = require("../util/database");

// Handler for http://localhost:8080/albums
exports.getAllAlbums = (req, res, next) => {
	client.query("SELECT * FROM albumtable", (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getAlbumsBySearch = (req, res, next) => {
	const search = req.params.search;
	if (/^\d+$/.test(search)) {
		const query = `
        SELECT *
        FROM albumtable
        WHERE uid = $1;
      `;
		client.query(query, [search], (err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result.rows);
		});
	}
};
