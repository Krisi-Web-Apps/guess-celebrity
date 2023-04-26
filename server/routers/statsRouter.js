const router = require("express").Router();
const { statsController } = require("../controllers");

// users
router.get("/users/count", statsController.get.users.count);
router.get("/users", statsController.get.users.all);

// celebrities
router.get("/celebrities/count", statsController.get.celebrities.count);

module.exports = router;
