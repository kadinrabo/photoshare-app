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
    fid integer PRIMARY KEY NOT NULL REFERENCES UserTable(uid) ON DELETE CASCADE CHECK(fid >= 1),
    dof timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
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
    pdata varchar(400) NOT NULL,
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
    lid serial PRIMARY KEY NOT NULL UNIQUE,
    uid integer NOT NULL REFERENCES UserTable(uid) ON DELETE CASCADE CHECK(uid >= 1)
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
    pid integer NOT NULL REFERENCES PhotoTable(pid) ON DELETE CASCADE CHECK(pid >= 1),
    lid integer NOT NULL REFERENCES LikeTable(lid) ON DELETE CASCADE CHECK(lid >= 1),
    PRIMARY KEY (pid, lid)
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

TRUNCATE TABLE FriendTable CASCADE;

INSERT INTO FriendTable (fid) VALUES (1);
INSERT INTO FriendTable (fid) VALUES (2);
INSERT INTO FriendTable (fid) VALUES (3);
INSERT INTO FriendTable (fid) VALUES (4);
INSERT INTO FriendTable (fid) VALUES (5);
INSERT INTO FriendTable (fid) VALUES (6);
INSERT INTO FriendTable (fid) VALUES (7);
INSERT INTO FriendTable (fid) VALUES (8);
INSERT INTO FriendTable (fid) VALUES (9);
INSERT INTO FriendTable (fid) VALUES (10);

TRUNCATE TABLE AlbumTable CASCADE;

INSERT INTO AlbumTable (uid, aname) VALUES (1, 'Vacation Memories');
INSERT INTO AlbumTable (uid, aname) VALUES (2, 'Family Reunion');
INSERT INTO AlbumTable (uid, aname) VALUES (3, 'Graduation Party');
INSERT INTO AlbumTable (uid, aname) VALUES (4, 'Halloween 2022');
INSERT INTO AlbumTable (uid, aname) VALUES (5, 'Road Trip');
INSERT INTO AlbumTable (uid, aname) VALUES (6, 'New Year Celebrations');
INSERT INTO AlbumTable (uid, aname) VALUES (7, 'Baby Shower');
INSERT INTO AlbumTable (uid, aname) VALUES (8, 'Wedding Anniversary');
INSERT INTO AlbumTable (uid, aname) VALUES (9, 'Summer Picnic');
INSERT INTO AlbumTable (uid, aname) VALUES (10, 'Christmas Party');

TRUNCATE TABLE PhotoTable CASCADE;

INSERT INTO PhotoTable (aid, pdata, caption) VALUES (1, 'https://firebasestorage.googleapis.com/v0/b/photoshare-3b86d.appspot.com/o/ahsoka.jpg?alt=media&token=e298d572-1e54-475e-b1b6-bab6e23c2342', NULL);
INSERT INTO PhotoTable (aid, pdata, caption) VALUES (2, 'https://firebasestorage.googleapis.com/v0/b/photoshare-3b86d.appspot.com/o/ahsoka.jpg?alt=media&token=e298d572-1e54-475e-b1b6-bab6e23c2342', 'Sunny day at the beach');
INSERT INTO PhotoTable (aid, pdata, caption) VALUES (3, 'https://firebasestorage.googleapis.com/v0/b/photoshare-3b86d.appspot.com/o/ahsoka.jpg?alt=media&token=e298d572-1e54-475e-b1b6-bab6e23c2342', NULL);
INSERT INTO PhotoTable (aid, pdata, caption) VALUES (4, 'https://firebasestorage.googleapis.com/v0/b/photoshare-3b86d.appspot.com/o/ahsoka.jpg?alt=media&token=e298d572-1e54-475e-b1b6-bab6e23c2342', 'Family picnic in the park');
INSERT INTO PhotoTable (aid, pdata, caption) VALUES (5, 'https://firebasestorage.googleapis.com/v0/b/photoshare-3b86d.appspot.com/o/ahsoka.jpg?alt=media&token=e298d572-1e54-475e-b1b6-bab6e23c2342', NULL);
INSERT INTO PhotoTable (aid, pdata, caption) VALUES (6, 'https://firebasestorage.googleapis.com/v0/b/photoshare-3b86d.appspot.com/o/ahsoka.jpg?alt=media&token=e298d572-1e54-475e-b1b6-bab6e23c2342', 'Hiking in the mountains');
INSERT INTO PhotoTable (aid, pdata, caption) VALUES (7, 'https://firebasestorage.googleapis.com/v0/b/photoshare-3b86d.appspot.com/o/ahsoka.jpg?alt=media&token=e298d572-1e54-475e-b1b6-bab6e23c2342', NULL);
INSERT INTO PhotoTable (aid, pdata, caption) VALUES (8, 'https://firebasestorage.googleapis.com/v0/b/photoshare-3b86d.appspot.com/o/ahsoka.jpg?alt=media&token=e298d572-1e54-475e-b1b6-bab6e23c2342', 'At the concert with friends');
INSERT INTO PhotoTable (aid, pdata, caption) VALUES (9, 'https://firebasestorage.googleapis.com/v0/b/photoshare-3b86d.appspot.com/o/ahsoka.jpg?alt=media&token=e298d572-1e54-475e-b1b6-bab6e23c2342', NULL);
INSERT INTO PhotoTable (aid, pdata, caption) VALUES (10, 'https://firebasestorage.googleapis.com/v0/b/photoshare-3b86d.appspot.com/o/ahsoka.jpg?alt=media&token=e298d572-1e54-475e-b1b6-bab6e23c2342', 'Summer road trip');

TRUNCATE TABLE CommentTable CASCADE;

INSERT INTO CommentTable (uid, ctext) VALUES (1, 'Great shot!');
INSERT INTO CommentTable (uid, ctext) VALUES (2, 'Lovely colors!');
INSERT INTO CommentTable (uid, ctext) VALUES (3, 'Wow, stunning!');
INSERT INTO CommentTable (uid, ctext) VALUES (4, 'Beautiful scenery');
INSERT INTO CommentTable (uid, ctext) VALUES (5, 'So cute!');
INSERT INTO CommentTable (uid, ctext) VALUES (6, 'Amazing view');
INSERT INTO CommentTable (uid, ctext) VALUES (7, 'Nice shot!');
INSERT INTO CommentTable (uid, ctext) VALUES (8, 'Adorable!');
INSERT INTO CommentTable (uid, ctext) VALUES (9, 'Impressive');
INSERT INTO CommentTable (uid, ctext) VALUES (10, 'So beautiful!');

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

TRUNCATE TABLE LikeTable CASCADE;

INSERT INTO LikeTable (uid) VALUES (1);
INSERT INTO LikeTable (uid) VALUES (2);
INSERT INTO LikeTable (uid) VALUES (3);
INSERT INTO LikeTable (uid) VALUES (4);
INSERT INTO LikeTable (uid) VALUES (5);
INSERT INTO LikeTable (uid) VALUES (6);
INSERT INTO LikeTable (uid) VALUES (7);
INSERT INTO LikeTable (uid) VALUES (8);
INSERT INTO LikeTable (uid) VALUES (9);
INSERT INTO LikeTable (uid) VALUES (10);

-- ########################################################################
-- Relationships

-- User has friend
TRUNCATE TABLE HasFriend CASCADE;

INSERT INTO HasFriend (uid, fid) VALUES (1, 10);
INSERT INTO HasFriend (uid, fid) VALUES (1, 9);
INSERT INTO HasFriend (uid, fid) VALUES (2, 8);
INSERT INTO HasFriend (uid, fid) VALUES (2, 7);
INSERT INTO HasFriend (uid, fid) VALUES (3, 6);
INSERT INTO HasFriend (uid, fid) VALUES (3, 5);
INSERT INTO HasFriend (uid, fid) VALUES (4, 4);
INSERT INTO HasFriend (uid, fid) VALUES (4, 3);
INSERT INTO HasFriend (uid, fid) VALUES (5, 2);
INSERT INTO HasFriend (uid, fid) VALUES (5, 1);
INSERT INTO HasFriend (uid, fid) VALUES (6, 2);
INSERT INTO HasFriend (uid, fid) VALUES (6, 3);
INSERT INTO HasFriend (uid, fid) VALUES (7, 4);
INSERT INTO HasFriend (uid, fid) VALUES (7, 5);
INSERT INTO HasFriend (uid, fid) VALUES (8, 6);
INSERT INTO HasFriend (uid, fid) VALUES (8, 7);
INSERT INTO HasFriend (uid, fid) VALUES (9, 8);
INSERT INTO HasFriend (uid, fid) VALUES (9, 9);
INSERT INTO HasFriend (uid, fid) VALUES (10, 10);
INSERT INTO HasFriend (uid, fid) VALUES (10, 1);

-- Photo has album
TRUNCATE TABLE HasAlbum CASCADE;

INSERT INTO HasAlbum (uid, aid) VALUES (1, 1);
INSERT INTO HasAlbum (uid, aid) VALUES (2, 2);
INSERT INTO HasAlbum (uid, aid) VALUES (3, 3);
INSERT INTO HasAlbum (uid, aid) VALUES (4, 4);
INSERT INTO HasAlbum (uid, aid) VALUES (5, 5);
INSERT INTO HasAlbum (uid, aid) VALUES (6, 6);
INSERT INTO HasAlbum (uid, aid) VALUES (7, 7);
INSERT INTO HasAlbum (uid, aid) VALUES (8, 8);
INSERT INTO HasAlbum (uid, aid) VALUES (9, 9);
INSERT INTO HasAlbum (uid, aid) VALUES (10, 10);

TRUNCATE TABLE Contains CASCADE;

INSERT INTO Contains (aid, pid) VALUES (1, 1);
INSERT INTO Contains (aid, pid) VALUES (2, 2);
INSERT INTO Contains (aid, pid) VALUES (3, 3);
INSERT INTO Contains (aid, pid) VALUES (4, 4);
INSERT INTO Contains (aid, pid) VALUES (5, 5);
INSERT INTO Contains (aid, pid) VALUES (6, 6);
INSERT INTO Contains (aid, pid) VALUES (7, 7);
INSERT INTO Contains (aid, pid) VALUES (8, 8);
INSERT INTO Contains (aid, pid) VALUES (9, 9);
INSERT INTO Contains (aid, pid) VALUES (10, 10);

TRUNCATE TABLE HasLike CASCADE;

INSERT INTO HasLike (pid, lid) VALUES (1, 1);
INSERT INTO HasLike (pid, lid) VALUES (1, 2);
INSERT INTO HasLike (pid, lid) VALUES (1, 3);
INSERT INTO HasLike (pid, lid) VALUES (1, 4);
INSERT INTO HasLike (pid, lid) VALUES (2, 5);
INSERT INTO HasLike (pid, lid) VALUES (3, 6);
INSERT INTO HasLike (pid, lid) VALUES (4, 7);
INSERT INTO HasLike (pid, lid) VALUES (5, 8);
INSERT INTO HasLike (pid, lid) VALUES (6, 9);
INSERT INTO HasLike (pid, lid) VALUES (7, 10);

TRUNCATE TABLE HasTag CASCADE;

INSERT INTO HasTag (pid, tid) VALUES (1, 1);
INSERT INTO HasTag (pid, tid) VALUES (1, 2);
INSERT INTO HasTag (pid, tid) VALUES (1, 3);
INSERT INTO HasTag (pid, tid) VALUES (1, 4);
INSERT INTO HasTag (pid, tid) VALUES (2, 5);
INSERT INTO HasTag (pid, tid) VALUES (3, 6);
INSERT INTO HasTag (pid, tid) VALUES (4, 7);
INSERT INTO HasTag (pid, tid) VALUES (5, 8);
INSERT INTO HasTag (pid, tid) VALUES (6, 9);
INSERT INTO HasTag (pid, tid) VALUES (7, 10);

TRUNCATE TABLE HasComment CASCADE;

INSERT INTO HasComment (pid, cid) VALUES (1, 1);
INSERT INTO HasComment (pid, cid) VALUES (1, 2);
INSERT INTO HasComment (pid, cid) VALUES (1, 3);
INSERT INTO HasComment (pid, cid) VALUES (1, 4);
INSERT INTO HasComment (pid, cid) VALUES (2, 5);
INSERT INTO HasComment (pid, cid) VALUES (3, 6);
INSERT INTO HasComment (pid, cid) VALUES (4, 7);
INSERT INTO HasComment (pid, cid) VALUES (5, 8);
INSERT INTO HasComment (pid, cid) VALUES (6, 9);
INSERT INTO HasComment (pid, cid) VALUES (7, 10);
