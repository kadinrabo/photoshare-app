const controller = require("../controllers/photos");
const router = require("express").Router();

router.get("/", controller.getAllPhotos);
router.get("/?uid=:uid", controller.getPhotosByUid);
router.get("/?aid=:aid", controller.getPhotosByAid);
router.get("/:fix/:tag/:uid", controller.getPhotosByUidAndTags);
router.get("/:tag", controller.getPhotosByTag);
router.get("/:uid/:tag", controller.getPhotosByUidAndTag);

router.post("/", controller.createNewPhoto);

router.delete("/?pid=:pid", controller.deletePhotoByPid);

module.exports = router;
