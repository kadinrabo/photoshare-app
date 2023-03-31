const controller = require("../controllers/photos");
const router = require("express").Router();

// /photos
router.get("/", controller.getAllPhotos);
router.get("/:tag", controller.getPhotosByTag);

module.exports = router;
