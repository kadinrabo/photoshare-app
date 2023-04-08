const controller = require("../controllers/likes");
const router = require("express").Router();

router.get("/", controller.getAllLikes);

router.post("/", controller.addLike);

module.exports = router;
