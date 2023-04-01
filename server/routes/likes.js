const controller = require("../controllers/likes");
const router = require("express").Router();

// /photos
router.get("/", controller.getAllLikes);
router.post("/", controller.addLike);

module.exports = router;
