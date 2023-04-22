const router = require("express").Router();
const { celebritiesController } = require("../controllers");

router.get("/", celebritiesController.get.all);
router.get("/:id", celebritiesController.get.byId);

router.post("/", celebritiesController.post.save);
router.post("/bulk", celebritiesController.post.createBulk);

router.delete("/:id", celebritiesController.del.byId);

module.exports = router;
