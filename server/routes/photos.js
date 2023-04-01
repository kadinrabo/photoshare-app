const controller = require("../controllers/photos");
const router = require("express").Router();

// /photos
router.get("/", controller.getAllPhotos);
router.post("/", controller.createNewPhoto);
router.delete("/?pid=:pid", controller.deletePhotoByPid);
router.get("/:tag", controller.getPhotosByTag);

module.exports = router;
