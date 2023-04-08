const controller = require("../controllers/albums");
const router = require("express").Router();

router.get("/", controller.getAllAlbums);
router.get("/:search", controller.getAlbumsBySearch);

router.post("/", controller.addNewAlbum);

module.exports = router;
