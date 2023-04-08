const controller = require("../controllers/comments");
const router = require("express").Router();

router.get("/", controller.getAllComments);
router.get("/?pid=:pid", controller.getCommentsByPid);

router.post("/?pid=:pid", controller.addComment);

module.exports = router;
