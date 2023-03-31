const controller = require("../controllers/users");
const router = require("express").Router();

// /users
router.get("/", controller.getAllUsers);
router.post("/", controller.createNewUser);
router.get("/?pid=:pid", controller.getUserByPid);
router.get("/?haslikepid=:haslikepid", controller.getUserHasLikeByPid);
router.get("/:search", controller.getUsersBySearch);

module.exports = router;
