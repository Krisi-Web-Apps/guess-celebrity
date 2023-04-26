const router = require("express").Router();
const { statsController } = require("../controllers");

router.get("/users/count", statsController.get.users.count);

module.exports = router;
