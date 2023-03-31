const controller = require("../controllers/tags");
const router = require("express").Router();

// /tags
router.get("/", controller.getAllTags);
router.get("/?pid=:pid", controller.getTagsByPid);

module.exports = router;
