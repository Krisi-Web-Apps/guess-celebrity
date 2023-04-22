const router = require("express").Router();
const { celebritiesController } = require("../controllers");

router.post("/", celebritiesController.post.save);
router.post("/bulk", celebritiesController.post.createBulk);

router.delete("/:id", celebritiesController.del.byId);

module.exports = router;
