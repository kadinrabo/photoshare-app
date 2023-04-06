const controller = require("../controllers/albums");
const router = require("express").Router();

router.get("/", controller.getAllAlbums);
router.post("/", controller.addNewAlbum);
router.get("/:search", controller.getAlbumsBySearch);

module.exports = router;
