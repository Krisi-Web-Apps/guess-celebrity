const router = require("express").Router();
const { statsController } = require("../controllers");

router.get("/users/count", statsController.get.users.count);
router.get("/users", statsController.get.users.all);

module.exports = router;
