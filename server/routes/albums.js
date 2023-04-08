const controller = require("../controllers/albums");
const router = require("express").Router();

router.get("/", controller.getAllAlbums);
router.get("/:search", controller.getAlbumsBySearch);

router.post("/", controller.addNewAlbum);

router.delete("/?aid=:aid", controller.deleteAlbum);

module.exports = router;
