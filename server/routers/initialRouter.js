const router = require("express").Router();

const { isAuth } = require("../config/middlewares");

router.get("/", (req, res) => res.send({ message: "Server Works!" }));
router.get("/about", isAuth, (req, res) => res.send({ message: "This is about!" }));

module.exports = router;
