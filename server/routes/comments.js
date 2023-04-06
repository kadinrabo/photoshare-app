const controller = require("../controllers/comments");
const router = require("express").Router();

router.get("/", controller.getAllComments);
router.post("/?pid=:pid", controller.addComment);
router.get("/?pid=:pid", controller.getCommentsByPid);

module.exports = router;
