const controller = require("../controllers/users");
const router = require("express").Router();

router.get("/", controller.getUsersByCScore);
router.get("/?all=:all", controller.getAllUsers);
router.get("/?uid=:uid", controller.getRecsByUid);
router.get("/?maylikeuid=:maylikeuid", controller.getMayLikeByUid);
router.get("/?pid=:pid", controller.getUserByPid);
router.get("/?aid=:aid", controller.getUserByAid);
router.get("/?haslikepid=:haslikepid", controller.getUserHasLikeByPid);
router.get("/:search", controller.getUsersBySearch);

router.post("/", controller.createNewUser);

router.put("/?uid=:uid", controller.updateUserByUid);

module.exports = router;
