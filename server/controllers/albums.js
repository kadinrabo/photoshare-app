const client = require("../util/database");

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

exports.deleteAlbum = (req, res, next) => {
	const aid = req.params.aid;
	client.query(
		"DELETE FROM contains WHERE aid = $1 RETURNING pid",
		[aid],
		(err, result) => {
			if (err) {
				return next(err);
			}
			const pids = result.rows.map((row) => row.pid);

			pids.forEach((pid) => {
				client.query(
					"DELETE FROM hascomment WHERE pid = $1 RETURNING cid",
					[pid],
					(err, result) => {
						if (err) {
							return next(err);
						}
						if (result.rowCount === 0) {
							console.log("No rows were deleted.");
							return;
						}
						const cids = result.rows.map((row) => row.cid);
						for (let i = 0; i < cids.length; i++) {
							client.query("DELETE FROM commenttable WHERE cid = $1", [
								cids[i],
							]);
						}
					}
				);
				client.query(
					"DELETE FROM hastag WHERE pid = $1 RETURNING tid",
					[pid],
					(err, result) => {
						if (err) {
							return next(err);
						}
						if (result.rowCount === 0) {
							console.log("No rows were deleted.");
							return;
						}
						const tids = result.rows.map((row) => row.tid);
						for (let i = 0; i < tids.length; i++) {
							client.query("DELETE FROM tagtable WHERE tid = $1", [tids[i]]);
						}
					}
				);
				client.query(
					"DELETE FROM haslike WHERE pid = $1 RETURNING lid",
					[pid],
					(err, result) => {
						if (err) {
							return next(err);
						}
						if (result.rowCount === 0) {
							console.log("No rows were deleted.");
							return;
						}
						const lids = result.rows.map((row) => row.lid);
						for (let i = 0; i < lids.length; i++) {
							client.query("DELETE FROM liketable WHERE lid = $1", [lids[i]]);
						}
					}
				);
				client.query(
					"DELETE FROM phototable WHERE pid = $1 RETURNING aid",
					[pid],
					(err, result) => {
						if (err) {
							return next(err);
						}
						const aid = result.rows[0].aid;
						client.query(
							"DELETE FROM contains WHERE aid = $1 AND pid = $2",
							[aid, pid],
							(err) => {
								if (err) {
									return next(err);
								}
							}
						);
					}
				);
			});
		}
	);

	client.query("DELETE FROM hasalbum WHERE aid = $1", [aid], (err) => {
		if (err) {
			return next(err);
		}
		client.query("DELETE FROM albumtable WHERE aid = $1", [aid], (err) => {
			if (err) {
				return next(err);
			}
		});
	});

	res.status(201).json({
		message: "Album deleted and all tables successfully deleted.",
	});
};
