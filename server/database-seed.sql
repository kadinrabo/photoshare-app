-- ########################################################################
-- Entities

DROP TABLE IF EXISTS UserTable CASCADE;

--SERIAL: Auto increment 1 to 2147483647
CREATE TABLE UserTable (
    uid serial NOT NULL UNIQUE,
	email varchar(320) NOT NULL UNIQUE,
	fname varchar(50) NOT NULL,
	lname varchar(50) NOT NULL,
	pass varchar(50) NOT NULL,
	dob date NOT NULL,
	gender varchar(10) DEFAULT NULL,
	home varchar(50) DEFAULT NULL,
    PRIMARY KEY (uid, email)
);

DROP TABLE IF EXISTS FriendTable CASCADE;

-- CHECK(uid >= 1) might be redunant, just really
-- making sure we are non-negative.
CREATE TABLE FriendTable (
    uid integer NOT NULL REFERENCES UserTable(uid) ON DELETE CASCADE CHECK(uid >= 1),
    fid integer NOT NULL REFERENCES UserTable(uid) ON DELETE CASCADE CHECK(fid >= 1),
    dof timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (uid, fid)
);

DROP TABLE IF EXISTS AlbumTable CASCADE;

-- enforcing an album name
CREATE TABLE AlbumTable (
    aid serial NOT NULL UNIQUE,
    uid integer NOT NULL REFERENCES UserTable(uid) ON DELETE CASCADE CHECK(uid >= 1),
    aname varchar(50) NOT NULL,
    doc timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (aid, uid)
);

DROP TABLE IF EXISTS PhotoTable CASCADE;

-- pdata will be a unique link to the photo in a file system (Firestore?)
CREATE TABLE PhotoTable (
    pid serial PRIMARY KEY NOT NULL UNIQUE,
    aid integer NOT NULL REFERENCES AlbumTable(aid) ON DELETE CASCADE CHECK(aid >= 1),
    pdata varchar(50) NOT NULL UNIQUE,
    caption varchar(1000) DEFAULT NULL
);

DROP TABLE IF EXISTS CommentTable CASCADE;

CREATE TABLE CommentTable (
    cid serial PRIMARY KEY NOT NULL UNIQUE,
    uid integer NOT NULL REFERENCES UserTable(uid) ON DELETE CASCADE CHECK(uid >= 1),
    ctext varchar(1000) NOT NULL,
    doc timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS TagTable CASCADE;

CREATE TABLE TagTable (
    tid serial NOT NULL UNIQUE,
    tag varchar(50) NOT NULL,
    PRIMARY KEY (tid, tag)
);

DROP TABLE IF EXISTS LikeTable CASCADE;

-- lid = like ID
CREATE TABLE LikeTable (
    uid integer PRIMARY KEY NOT NULL REFERENCES UserTable(uid) ON DELETE CASCADE CHECK(uid >= 1),
    pid integer NOT NULL REFERENCES PhotoTable(pid) ON DELETE CASCADE CHECK(pid >= 1)
);

-- ########################################################################
-- Relationships

DROP TABLE IF EXISTS HasFriend CASCADE;

-- User has a friend
CREATE TABLE HasFriend (
    uid integer NOT NULL REFERENCES UserTable(uid) ON DELETE CASCADE CHECK(uid >= 1),
    fid integer NOT NULL REFERENCES UserTable(uid) ON DELETE CASCADE CHECK(fid >= 1),
    PRIMARY KEY(uid, fid)
);

DROP TABLE IF EXISTS HasAlbum CASCADE;

-- User has an album
CREATE TABLE HasAlbum (
    uid integer NOT NULL REFERENCES UserTable(uid) ON DELETE CASCADE CHECK(uid >= 1),
    aid integer NOT NULL REFERENCES AlbumTable(aid) ON DELETE CASCADE CHECK(aid >= 1),
    PRIMARY KEY (uid, aid)
);

DROP TABLE IF EXISTS Contains CASCADE;

-- Album contains photo
CREATE TABLE Contains (
    aid integer NOT NULL REFERENCES AlbumTable(aid) ON DELETE CASCADE CHECK(aid >= 1),
    pid integer NOT NULL REFERENCES PhotoTable(pid) ON DELETE CASCADE CHECK(pid >= 1),
    PRIMARY KEY (aid, pid)
);

DROP TABLE IF EXISTS HasLike CASCADE;

-- Photo has like (uid uniquely identifies the like)
CREATE TABLE HasLike (
    uid integer NOT NULL REFERENCES LikeTable(uid) ON DELETE CASCADE CHECK(uid >= 1),
    pid integer NOT NULL REFERENCES PhotoTable(pid) ON DELETE CASCADE CHECK(pid >= 1),
    PRIMARY KEY (uid, pid)
);

DROP TABLE IF EXISTS HasTag CASCADE;

-- Photo has tag
CREATE TABLE HasTag (
    pid integer NOT NULL REFERENCES PhotoTable(pid) ON DELETE CASCADE CHECK(pid >= 1),
    tid integer NOT NULL REFERENCES TagTable(tid) ON DELETE CASCADE CHECK(tid >= 1),
    PRIMARY KEY (pid, tid)
);

DROP TABLE IF EXISTS HasComment CASCADE;

-- Photo has comment
CREATE TABLE HasComment (
    pid integer NOT NULL REFERENCES PhotoTable(pid) ON DELETE CASCADE CHECK(pid >= 1),
    cid integer NOT NULL REFERENCES CommentTable(cid) ON DELETE CASCADE CHECK(cid >= 1),
    PRIMARY KEY (pid, cid)
);

-- ########################################################################
-- Entities

TRUNCATE TABLE UserTable CASCADE;
INSERT INTO UserTable (email, fname, lname, pass, dob, gender, home) VALUES ('john.doe@example.com', 'John', 'Doe', 'password', '1990-01-01', 'Male', 'New York');
INSERT INTO UserTable (email, fname, lname, pass, dob) VALUES ('jane.doe@example.com', 'Jane', 'Doe', 'password', '1992-02-02');
INSERT INTO UserTable (email, fname, lname, pass, dob, gender) VALUES ('jim.smith@example.com', 'Jim', 'Smith', 'password', '1985-03-03', 'Male');
INSERT INTO UserTable (email, fname, lname, pass, dob, gender, home) VALUES ('sarah.jones@example.com', 'Sarah', 'Jones', 'password', '1995-04-04', NULL, 'Los Angeles');
INSERT INTO UserTable (email, fname, lname, pass, dob, gender, home) VALUES ('katie.williams@example.com', 'Katie', 'Williams', 'password', '1998-05-05', 'Female', NULL);
INSERT INTO UserTable (email, fname, lname, pass, dob) VALUES ('david.nguyen@example.com', 'David', 'Nguyen', 'password', '1991-06-06');
INSERT INTO UserTable (email, fname, lname, pass, dob, gender) VALUES ('mary.brown@example.com', 'Mary', 'Brown', 'password', '1988-07-07', 'Female');
INSERT INTO UserTable (email, fname, lname, pass, dob, gender, home) VALUES ('chris.taylor@example.com', 'Chris', 'Taylor', 'password', '1994-08-08', 'Male', 'Seattle');
INSERT INTO UserTable (email, fname, lname, pass, dob) VALUES ('samuel.clark@example.com', 'Samuel', 'Clark', 'password', '1999-09-09');
INSERT INTO UserTable (email, fname, lname, pass, dob, gender, home) VALUES ('linda.smith@example.com', 'Linda', 'Smith', 'password', '1997-10-10', NULL, 'San Francisco');

SELECT * FROM UserTable;

TRUNCATE TABLE FriendTable CASCADE;

INSERT INTO FriendTable (uid, fid) VALUES (1, 2);
INSERT INTO FriendTable (uid, fid) VALUES (1, 3);
INSERT INTO FriendTable (uid, fid) VALUES (1, 4);
INSERT INTO FriendTable (uid, fid) VALUES (2, 1);
INSERT INTO FriendTable (uid, fid) VALUES (2, 3);
INSERT INTO FriendTable (uid, fid) VALUES (3, 1);
INSERT INTO FriendTable (uid, fid) VALUES (3, 2);
INSERT INTO FriendTable (uid, fid) VALUES (4, 1);
INSERT INTO FriendTable (uid, fid) VALUES (5, 2);
INSERT INTO FriendTable (uid, fid) VALUES (6, 7);

SELECT * FROM FriendTable;

TRUNCATE TABLE AlbumTable CASCADE;

INSERT INTO AlbumTable (uid, aname) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Vacation Memories');
INSERT INTO AlbumTable (uid, aname) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Family Reunion');
INSERT INTO AlbumTable (uid, aname) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Graduation Party');
INSERT INTO AlbumTable (uid, aname) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Halloween 2022');
INSERT INTO AlbumTable (uid, aname) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Road Trip');
INSERT INTO AlbumTable (uid, aname) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'New Year Celebrations');
INSERT INTO AlbumTable (uid, aname) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Baby Shower');
INSERT INTO AlbumTable (uid, aname) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Wedding Anniversary');
INSERT INTO AlbumTable (uid, aname) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Summer Picnic');
INSERT INTO AlbumTable (uid, aname) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Christmas Party');

SELECT * FROM AlbumTable;

TRUNCATE TABLE PhotoTable CASCADE;

INSERT INTO PhotoTable (aid, pdata, caption) VALUES ((SELECT aid FROM AlbumTable ORDER BY RANDOM() LIMIT 1), 'https://firestore.com/pic1', NULL);
INSERT INTO PhotoTable (aid, pdata, caption) VALUES ((SELECT aid FROM AlbumTable ORDER BY RANDOM() LIMIT 1), 'https://firestore.com/pic2', 'Sunny day at the beach');
INSERT INTO PhotoTable (aid, pdata, caption) VALUES ((SELECT aid FROM AlbumTable ORDER BY RANDOM() LIMIT 1), 'https://firestore.com/pic3', NULL);
INSERT INTO PhotoTable (aid, pdata, caption) VALUES ((SELECT aid FROM AlbumTable ORDER BY RANDOM() LIMIT 1), 'https://firestore.com/pic4', 'Family picnic in the park');
INSERT INTO PhotoTable (aid, pdata, caption) VALUES ((SELECT aid FROM AlbumTable ORDER BY RANDOM() LIMIT 1), 'https://firestore.com/pic5', NULL);
INSERT INTO PhotoTable (aid, pdata, caption) VALUES ((SELECT aid FROM AlbumTable ORDER BY RANDOM() LIMIT 1), 'https://firestore.com/pic6', 'Hiking in the mountains');
INSERT INTO PhotoTable (aid, pdata, caption) VALUES ((SELECT aid FROM AlbumTable ORDER BY RANDOM() LIMIT 1), 'https://firestore.com/pic7', NULL);
INSERT INTO PhotoTable (aid, pdata, caption) VALUES ((SELECT aid FROM AlbumTable ORDER BY RANDOM() LIMIT 1), 'https://firestore.com/pic8', 'At the concert with friends');
INSERT INTO PhotoTable (aid, pdata, caption) VALUES ((SELECT aid FROM AlbumTable ORDER BY RANDOM() LIMIT 1), 'https://firestore.com/pic9', NULL);
INSERT INTO PhotoTable (aid, pdata, caption) VALUES ((SELECT aid FROM AlbumTable ORDER BY RANDOM() LIMIT 1), 'https://firestore.com/pic10', 'Summer road trip');

SELECT * FROM PhotoTable;

TRUNCATE TABLE CommentTable CASCADE;

INSERT INTO CommentTable (uid, ctext) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Great shot!');
INSERT INTO CommentTable (uid, ctext) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Lovely colors!');
INSERT INTO CommentTable (uid, ctext) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Wow, stunning!');
INSERT INTO CommentTable (uid, ctext) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Beautiful scenery');
INSERT INTO CommentTable (uid, ctext) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'So cute!');
INSERT INTO CommentTable (uid, ctext) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Amazing view');
INSERT INTO CommentTable (uid, ctext) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Nice shot!');
INSERT INTO CommentTable (uid, ctext) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Adorable!');
INSERT INTO CommentTable (uid, ctext) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'Impressive');
INSERT INTO CommentTable (uid, ctext) VALUES ((SELECT uid FROM UserTable ORDER BY RANDOM() LIMIT 1), 'So beautiful!');

SELECT * FROM CommentTable;

TRUNCATE TABLE TagTable CASCADE;

INSERT INTO TagTable (tag) VALUES ('#sunset');
INSERT INTO TagTable (tag) VALUES ('#beachlife');
INSERT INTO TagTable (tag) VALUES ('#naturelover');
INSERT INTO TagTable (tag) VALUES ('#instagood');
INSERT INTO TagTable (tag) VALUES ('#foodie');
INSERT INTO TagTable (tag) VALUES ('#travelgram');
INSERT INTO TagTable (tag) VALUES ('#petsofinstagram');
INSERT INTO TagTable (tag) VALUES ('#fitnessmotivation');
INSERT INTO TagTable (tag) VALUES ('#photography');
INSERT INTO TagTable (tag) VALUES ('#fashionista');

SELECT * FROM TagTable;

TRUNCATE TABLE LikeTable CASCADE;

INSERT INTO LikeTable (uid, pid) VALUES (1, 2);
INSERT INTO LikeTable (uid, pid) VALUES (3, 1);
INSERT INTO LikeTable (uid, pid) VALUES (5, 4);
INSERT INTO LikeTable (uid, pid) VALUES (7, 3);
INSERT INTO LikeTable (uid, pid) VALUES (9, 6);
INSERT INTO LikeTable (uid, pid) VALUES (2, 8);
INSERT INTO LikeTable (uid, pid) VALUES (4, 7);
INSERT INTO LikeTable (uid, pid) VALUES (6, 5);
INSERT INTO LikeTable (uid, pid) VALUES (8, 10);
INSERT INTO LikeTable (uid, pid) VALUES (10, 9);

SELECT * FROM LikeTable;

-- ########################################################################
-- Relationships

-- User has friend
TRUNCATE TABLE HasFriend CASCADE;

INSERT INTO HasFriend (uid, fid) VALUES (1, 2);
INSERT INTO HasFriend (uid, fid) VALUES (1, 3);
INSERT INTO HasFriend (uid, fid) VALUES (1, 4);
INSERT INTO HasFriend (uid, fid) VALUES (2, 1);
INSERT INTO HasFriend (uid, fid) VALUES (2, 3);
INSERT INTO HasFriend (uid, fid) VALUES (3, 1);
INSERT INTO HasFriend (uid, fid) VALUES (3, 2);
INSERT INTO HasFriend (uid, fid) VALUES (4, 1);
INSERT INTO HasFriend (uid, fid) VALUES (5, 2);
INSERT INTO HasFriend (uid, fid) VALUES (6, 7);

SELECT * FROM HasFriend;

-- Photo has album
TRUNCATE TABLE HasAlbum CASCADE;

INSERT INTO HasAlbum (uid, aid) VALUES (1, 1);
INSERT INTO HasAlbum (uid, aid) VALUES (6, 2);
INSERT INTO HasAlbum (uid, aid) VALUES (8, 3);
INSERT INTO HasAlbum (uid, aid) VALUES (2, 4);
INSERT INTO HasAlbum (uid, aid) VALUES (9, 5);
INSERT INTO HasAlbum (uid, aid) VALUES (1, 6);
INSERT INTO HasAlbum (uid, aid) VALUES (4, 7);
INSERT INTO HasAlbum (uid, aid) VALUES (3, 8);
INSERT INTO HasAlbum (uid, aid) VALUES (5, 9);
INSERT INTO HasAlbum (uid, aid) VALUES (7, 10);

SELECT * FROM HasAlbum;

TRUNCATE TABLE Contains CASCADE;

INSERT INTO Contains (aid, pid) VALUES (5, 1);
INSERT INTO Contains (aid, pid) VALUES (6, 2);
INSERT INTO Contains (aid, pid) VALUES (4, 3);
INSERT INTO Contains (aid, pid) VALUES (3, 4);
INSERT INTO Contains (aid, pid) VALUES (1, 5);
INSERT INTO Contains (aid, pid) VALUES (10, 6);
INSERT INTO Contains (aid, pid) VALUES (10, 7);
INSERT INTO Contains (aid, pid) VALUES (7, 8);
INSERT INTO Contains (aid, pid) VALUES (4, 9);
INSERT INTO Contains (aid, pid) VALUES (2, 10);

SELECT * FROM Contains;

TRUNCATE TABLE HasLike CASCADE;

INSERT INTO HasLike (uid, pid) VALUES (2, 1);
INSERT INTO HasLike (uid, pid) VALUES (1, 3);
INSERT INTO HasLike (uid, pid) VALUES (4, 5);
INSERT INTO HasLike (uid, pid) VALUES (3, 7);
INSERT INTO HasLike (uid, pid) VALUES (6, 9);
INSERT INTO HasLike (uid, pid) VALUES (8, 2);
INSERT INTO HasLike (uid, pid) VALUES (7, 4);
INSERT INTO HasLike (uid, pid) VALUES (5, 6);
INSERT INTO HasLike (uid, pid) VALUES (10, 8);
INSERT INTO HasLike (uid, pid) VALUES (9, 10);

SELECT * FROM HasLike;

TRUNCATE TABLE HasTag CASCADE;

INSERT INTO HasTag (pid, tid) VALUES (1, 2);
INSERT INTO HasTag (pid, tid) VALUES (3, 1);
INSERT INTO HasTag (pid, tid) VALUES (5, 4);
INSERT INTO HasTag (pid, tid) VALUES (7, 3);
INSERT INTO HasTag (pid, tid) VALUES (9, 6);
INSERT INTO HasTag (pid, tid) VALUES (2, 8);
INSERT INTO HasTag (pid, tid) VALUES (4, 7);
INSERT INTO HasTag (pid, tid) VALUES (6, 5);
INSERT INTO HasTag (pid, tid) VALUES (8, 10);
INSERT INTO HasTag (pid, tid) VALUES (10, 9);

SELECT * FROM HasTag;

TRUNCATE TABLE HasComment CASCADE;

INSERT INTO HasComment (pid, cid) VALUES (1, 2);
INSERT INTO HasComment (pid, cid) VALUES (3, 1);
INSERT INTO HasComment (pid, cid) VALUES (5, 4);
INSERT INTO HasComment (pid, cid) VALUES (7, 3);
INSERT INTO HasComment (pid, cid) VALUES (9, 6);
INSERT INTO HasComment (pid, cid) VALUES (2, 8);
INSERT INTO HasComment (pid, cid) VALUES (4, 7);
INSERT INTO HasComment (pid, cid) VALUES (6, 5);
INSERT INTO HasComment (pid, cid) VALUES (8, 10);
INSERT INTO HasComment (pid, cid) VALUES (10, 9);

SELECT * FROM HasComment;