const controller = require("../controllers/users");
const router = require("express").Router();

// /users
router.get("/", controller.getAllUsers);
router.get("/?uid=:uid", controller.getRecsByUid);
router.get("/?pid=:pid", controller.getUserByPid);
router.get("/?haslikepid=:haslikepid", controller.getUserHasLikeByPid);
router.get("/:search", controller.getUsersBySearch);

router.post("/", controller.createNewUser);

router.put("/?uid=:uid", controller.updateUserByUid);

module.exports = router;
