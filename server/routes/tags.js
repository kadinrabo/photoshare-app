const controller = require("../controllers/tags");
const router = require("express").Router();

// /tags
router.get("/", controller.getAllTags);
router.post("/?pid=:pid", controller.addTag);
router.get("/?pid=:pid", controller.getTagsByPid);

module.exports = router;
