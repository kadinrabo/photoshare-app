const client = require("../util/database");

exports.getAllFriends = (req, res, next) => {
	client.query("SELECT * FROM friendtable", (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getFollowedByFid = (req, res, next) => {
	const uidf = req.params.uidf;
	const query = `
		SELECT * FROM usertable WHERE uid IN (SELECT uid FROM hasfriend WHERE fid = $1);
	`;
	client.query(query, [uidf], (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getFollowingByUid = (req, res, next) => {
	const uid = req.params.uid;
	const query = `
		SELECT * FROM usertable WHERE uid IN (SELECT fid FROM hasfriend WHERE uid = $1);
	`;
	client.query(query, [uid], (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.getHasFriendByUidFid = (req, res, next) => {
	const uid = req.params.uid;
	const fid = req.params.fid;
	const query = `	
		SELECT * FROM hasfriend WHERE uid = $1 AND fid = $2;
	`;
	client.query(query, [uid, fid], (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

exports.addFriend = (req, res, next) => {
	const { fid, uid } = req.body;
	client.query(
		"INSERT INTO friendtable (fid) VALUES ($1) ON CONFLICT (fid) DO NOTHING",
		[fid],
		(err, result) => {
			if (err) {
				return next(err);
			}
			client.query(
				"INSERT INTO hasfriend (uid, fid) VALUES ($1, $2) ON CONFLICT (uid, fid) DO NOTHING",
				[uid, fid],
				(err) => {
					if (err) {
						return next(err);
					}
					res.status(201).json({
						message: "Friend added and hasfriend table updated successfully!",
					});
				}
			);
		}
	);
};
