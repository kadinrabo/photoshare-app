-- List of all queries ever used by the server on the database

-- /server/controllers/albums.js
SELECT * FROM albumtable;
SELECT * FROM albumtable WHERE uid = $1;
INSERT INTO albumtable (uid, aname) VALUES ($1, $2) RETURNING aid;
INSERT INTO hasalbum (uid, aid) VALUES ($1, $2);

-- /server/controllers/comments.js
SELECT * FROM commenttable;
SELECT * FROM commenttable WHERE cid IN (SELECT cid FROM hascomment WHERE pid = $1);
INSERT INTO commenttable (uid, ctext) VALUES ($1, $2) RETURNING cid;
INSERT INTO hascomment (pid, cid) VALUES ($1, $2);

-- /server/controllers/friends.js
SELECT * FROM friendtable;
SELECT * FROM usertable WHERE uid IN (SELECT uid FROM hasfriend WHERE fid = $1);
SELECT * FROM usertable WHERE uid IN (SELECT fid FROM hasfriend WHERE uid = $1);
INSERT INTO friendtable (fid) VALUES ($1) ON CONFLICT (fid) DO NOTHING;
INSERT INTO hasfriend (uid, fid) VALUES ($1, $2) ON CONFLICT (uid, fid) DO NOTHING;

-- /server/controllers/likes.js
SELECT * FROM liketable;
INSERT INTO liketable (uid) VALUES ($1) RETURNING lid;
INSERT INTO haslike (pid, lid) VALUES ($1, $2);

-- /server/controllers/photos.js
SELECT * FROM phototable;
SELECT * FROM phototable WHERE aid in (SELECT aid FROM albumtable WHERE uid = $1);
SELECT * FROM phototable WHERE aid = $1;
SELECT * FROM phototable WHERE pid IN (SELECT pid FROM hastag WHERE tid IN (SELECT tid FROM tagtable WHERE tag ILIKE $1)) AND aid IN (SELECT aid FROM albumtable WHERE uid = $2);
SELECT * FROM phototable WHERE pid IN (SELECT pid FROM hastag WHERE tid IN (SELECT tid FROM tagtable WHERE tag ILIKE ANY ($1))) AND aid IN (SELECT aid FROM albumtable WHERE uid = $2);
SELECT * FROM phototable WHERE pid IN (SELECT pid FROM hastag WHERE tid IN (SELECT tid FROM tagtable WHERE tag ILIKE $1));
SELECT * FROM phototable WHERE pid IN (SELECT pid FROM hastag WHERE tid IN (SELECT tid FROM tagtable WHERE tag ILIKE ANY ($1))
GROUP BY pid HAVING COUNT(DISTINCT tid) = $2);
SELECT * FROM phototable WHERE pid in (SELECT pid FROM hastag WHERE tid in (SELECT tid FROM tagtable WHERE tag = $1)) AND aid in (SELECT aid FROM albumtable WHERE uid = $2);
INSERT INTO phototable (aid, pdata, caption) VALUES ($1, $2, $3) RETURNING pid
INSERT INTO contains (aid, pid) VALUES ($1, $2);
DELETE FROM hascomment WHERE pid = $1 RETURNING cid;
DELETE FROM commenttable WHERE cid = $1;
DELETE FROM hastag WHERE pid = $1 RETURNING tid;
DELETE FROM tagtable WHERE tid = $1;
DELETE FROM haslike WHERE pid = $1 RETURNING lid;
DELETE FROM liketable WHERE lid = $1;
DELETE FROM phototable WHERE pid = $1 RETURNING aid;
DELETE FROM contains WHERE aid = $1 AND pid = $2;

-- /server/controllers/tags.js
SELECT t.* FROM hastag ht JOIN tagtable t ON ht.tid = t.tid GROUP BY ht.tid, t.tag, t.tid ORDER BY COUNT(*) DESC LIMIT 10;
SELECT * from tagtable;
SELECT * FROM tagtable WHERE tid IN (SELECT tid FROM hastag WHERE pid = $1);
SELECT * FROM tagtable WHERE tag ILIKE $1;
SELECT * FROM tagtable WHERE tag ILIKE ANY ($1);
SELECT * FROM tagtable WHERE tid in (SELECT tid FROM hastag WHERE pid in (SELECT pid FROM phototable WHERE aid in (SELECT aid FROM albumtable WHERE uid = $1)));
INSERT INTO tagtable (tag) VALUES ($1) RETURNING tid;
INSERT INTO hastag (pid, tid) VALUES ($1, $2);

-- /server/controllers/users.js
SELECT usertable.* FROM usertable
		LEFT JOIN albumtable ON usertable.uid = albumtable.uid
		LEFT JOIN phototable ON albumtable.aid = phototable.aid
		LEFT JOIN commenttable ON usertable.uid = commenttable.uid
		GROUP BY usertable.uid, usertable.email, usertable.fname, usertable.lname
		ORDER BY COUNT(DISTINCT commenttable.cid) + COUNT(DISTINCT phototable.pid) DESC
		LIMIT 10;
SELECT * FROM usertable;
SELECT u.*
	FROM usertable u
	JOIN hasfriend hf1 ON u.uid = hf1.fid
	JOIN hasfriend hf2 ON hf1.uid = hf2.fid
	WHERE hf2.uid = $1 AND u.uid NOT IN (
		SELECT fid FROM hasfriend WHERE uid = $1
	) AND u.uid != $1
	GROUP BY u.uid, u.email
	ORDER BY COUNT(*) DESC;
SELECT pt.*, COUNT(*) AS common_count
	FROM PhotoTable pt
	JOIN HasAlbum ha ON pt.aid = ha.aid
	JOIN AlbumTable at ON at.aid = ha.aid
	JOIN HasTag ht ON ht.pid = pt.pid
	JOIN TagTable tt ON tt.tid = ht.tid
	WHERE at.uid != $1 AND pt.pid IN (
		SELECT pt2.pid
		FROM PhotoTable pt2
		JOIN HasTag ht2 ON ht2.pid = pt2.pid
		JOIN TagTable tt2 ON tt2.tid = ht2.tid
		WHERE tt2.tag IN (
			SELECT tt3.tag
			FROM (
				SELECT ht3.tid, COUNT(*) AS cnt
				FROM PhotoTable pt3
				JOIN HasTag ht3 ON ht3.pid = pt3.pid
				JOIN TagTable tt3 ON tt3.tid = ht3.tid
				WHERE pt3.aid IN (
					SELECT at2.aid
					FROM AlbumTable at2
					WHERE at2.uid = $1
				)
				GROUP BY ht3.tid
				ORDER BY cnt DESC
				LIMIT 5
			) AS top_tags
			JOIN TagTable tt3 ON tt3.tid = top_tags.tid
			ORDER BY top_tags.cnt DESC
		)
	)
	GROUP BY pt.pid
	ORDER BY common_count DESC
	LIMIT 5;
SELECT * FROM usertable WHERE uid IN 
			(SELECT uid FROM albumtable WHERE aid IN (
				SELECT aid
				FROM contains
				WHERE pid = $1));
SELECT * FROM usertable WHERE uid IN 
			(SELECT uid FROM albumtable WHERE aid = $1);
SELECT * FROM usertable WHERE uid IN (
			SELECT uid
			FROM liketable
			WHERE lid IN (
				SELECT lid
				FROM haslike
				WHERE pid = $1
			)
		);
SELECT *
        FROM usertable
        WHERE uid = $1;
SELECT *
        FROM usertable
        WHERE email = $1;
SELECT * FROM usertable WHERE fname ILIKE '%' || $1 || '%' OR lname ILIKE '%' || $1 || '%' OR concat(fname, ' ', lname) ILIKE '%' || $1 || '%';
INSERT INTO usertable (email, fname, lname, pass, dob, gender, home) VALUES ($1, $2, $3, $4, $5, $6, $7);
UPDATE usertable SET pass = $2, fname = $3, lname = $4, dob = $5, gender = $6, home = $7 WHERE uid = $1;