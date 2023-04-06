const client = require("../util/database");

exports.getAllAlbums = (req, res, next) => {
	client.query("SELECT * FROM albumtable", (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.addNewAlbum = (req, res, next) => {
	const { uid, aname } = req.body;
	client.query(
		"INSERT INTO albumtable (uid, aname) VALUES ($1, $2) RETURNING aid",
		[uid, aname],
		(err, result) => {
			if (err) {
				return next(err);
			}
			const newAid = result.rows[0].aid;
			client.query(
				"INSERT INTO hasalbum (uid, aid) VALUES ($1, $2)",
				[uid, newAid],
				(err) => {
					if (err) {
						return next(err);
					}
					res.status(201).json({
						message: "Album added and hasalbum table updated successfully!",
					});
				}
			);
		}
	);
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
