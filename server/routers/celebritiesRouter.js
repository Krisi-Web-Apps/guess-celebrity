const router = require("express").Router();
const { celebritiesController } = require("../controllers");

router.post("/", celebritiesController.post.save);
router.post("/bulk", celebritiesController.post.createBulk);

module.exports = router;
