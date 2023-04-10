const client = require("../util/database");

exports.getAllPhotos = (req, res, next) => {
	client.query("SELECT * FROM phototable", (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getPhotosByUid = (req, res, next) => {
	const uid = req.params.uid;
	const query = `
		SELECT * FROM phototable WHERE aid in (SELECT aid FROM albumtable WHERE uid = $1);
	  `;
	client.query(query, [uid], (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getPhotosByAid = (req, res, next) => {
	const aid = req.params.aid;

	const query = `SELECT * FROM phototable WHERE aid = $1;`;
	client.query(query, [aid], (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getPhotosByUidAndTags = (req, res, next) => {
	const tag = req.params.tag;
	const uid = req.params.uid;

	if (tag.split(",").length === 1) {
		const search = "%" + "#" + req.params.tag + "%";
		const query = `
		SELECT * FROM phototable WHERE pid IN (
			SELECT pid FROM hastag WHERE tid IN (
				SELECT tid FROM tagtable WHERE tag ILIKE $1)
		) AND aid IN (SELECT aid FROM albumtable WHERE uid = $2);
		`;
		client.query(query, [search, uid], (err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result.rows);
		});
	} else if (tag.split(",").length > 1) {
		const tags = tag.split(",");
		const search = tags.map((t) => "%" + "#" + t.trim() + "%");
		const query = `
		SELECT * FROM phototable WHERE pid IN (
			SELECT pid FROM hastag WHERE tid IN (
				SELECT tid FROM tagtable WHERE tag ILIKE ANY ($1))
		) AND aid IN (SELECT aid FROM albumtable WHERE uid = $2);
		`;
		client.query(query, [search, uid], (err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result.rows);
		});
	}
};

exports.getPhotosByTag = (req, res, next) => {
	const tag = req.params.tag;

	if (tag.split(",").length === 1) {
		const search = "%" + "#" + req.params.tag + "%";
		const query = `
	SELECT * FROM phototable WHERE pid IN (
	    SELECT pid FROM hastag WHERE tid IN (
	        SELECT tid FROM tagtable
	        WHERE tag ILIKE $1)
	);`;
		client.query(query, [search], (err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result.rows);
		});
	} else if (tag.split(",").length > 1) {
		const tags = tag.split(",");
		const search = tags.map((t) => "%" + "#" + t.trim() + "%");

		const query = `
        SELECT * FROM phototable WHERE pid IN (
            SELECT pid FROM hastag WHERE tid IN (
                SELECT tid FROM tagtable
                WHERE tag ILIKE ANY ($1)
            )
            GROUP BY pid
            HAVING COUNT(DISTINCT tid) = $2
        );`;

		client.query(query, [search, tags.length], (err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result.rows);
		});
	}
};

exports.getPhotosByUidAndTag = (req, res, next) => {
	const uid = req.params.uid;
	const tag = req.params.tag;
	const query = `
		SELECT * FROM phototable WHERE pid in (SELECT pid FROM hastag WHERE tid in (SELECT tid FROM tagtable WHERE tag = $1))
		AND aid in (SELECT aid FROM albumtable WHERE uid = $2);
	  `;
	client.query(query, ["#" + tag, uid], (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.createNewPhoto = (req, res, next) => {
	const { aid, pdata, caption } = req.body;
	client.query(
		"INSERT INTO phototable (aid, pdata, caption) VALUES ($1, $2, $3) RETURNING pid",
		[aid, pdata, caption],
		(err, result) => {
			if (err) {
				return next(err);
			}
			const pid = result.rows[0].pid;
			client.query(
				"INSERT INTO contains (aid, pid) VALUES ($1, $2)",
				[aid, pid],
				(err) => {
					if (err) {
						return next(err);
					}
				}
			);
			res.status(201).json({
				message: "Photo created and contains table updated successfully.",
			});
		}
	);
};

exports.deletePhotoByPid = (req, res, next) => {
	const pid = req.params.pid;
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
				client.query("DELETE FROM commenttable WHERE cid = $1", [cids[i]]);
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
	res.status(201).json({
		message: "Photo deleted and all tables successfully updated.",
	});
};
