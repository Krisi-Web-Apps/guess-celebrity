const router = require("express").Router();
const { usersController } = require("../controllers");

router.post("/register", usersController.post.register);

module.exports = router;
