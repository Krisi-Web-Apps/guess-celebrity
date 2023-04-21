const router = require("express").Router();

router.get("/", (req, res) => res.send({ message: "Server Works!" }));

module.exports = router;
