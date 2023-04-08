const controller = require("../controllers/friends");
const router = require("express").Router();

router.get("/", controller.getAllFriends);
router.get("/?uidf=:uidf", controller.getFollowedByFid);
router.get("/?uid=:uid", controller.getFollowingByUid);
router.get("/:uid/:fid", controller.getHasFriendByUidFid);

router.post("/", controller.addFriend);

module.exports = router;
