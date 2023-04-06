const controller = require("../controllers/friends");
const router = require("express").Router();

router.get("/", controller.getAllFriends);
router.post("/", controller.addFriend);
router.get("/?uidf=:uidf", controller.getFollowedByFid);
router.get("/?uid=:uid", controller.getFollowingByUid);
router.get("/:uid/:fid", controller.getHasFriendByUidFid);

module.exports = router;
