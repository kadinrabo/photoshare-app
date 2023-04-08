const controller = require("../controllers/tags");
const router = require("express").Router();

router.get("/", controller.getPopularTags);
router.get("/?pid=:pid", controller.getTagsByPid);
router.get("/?uid=:uid", controller.getAllUniqueTagsByUid);

router.post("/?pid=:pid", controller.addTag);

module.exports = router;
