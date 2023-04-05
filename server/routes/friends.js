const controller = require("../controllers/friends");
const router = require("express").Router();

// /friends
router.get("/", controller.getAllFriends);
router.post("/", controller.addFriend);
router.get("/?uidf=:uidf", controller.getFollowedByFid); // followers (fid)
router.get("/?uid=:uid", controller.getFollowingByUid); // following (uid)
router.get("/:uid/:fid", controller.getHasFriendByUidFid); // followers (fid)

module.exports = router;
