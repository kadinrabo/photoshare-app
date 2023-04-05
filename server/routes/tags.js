const controller = require("../controllers/tags");
const router = require("express").Router();

// /tags
router.get("/", controller.getPopularTags);
router.post("/?pid=:pid", controller.addTag);
router.get("/?pid=:pid", controller.getTagsByPid);
router.get("/?uid=:uid", controller.getAllUniqueTagsByUid);

module.exports = router;
