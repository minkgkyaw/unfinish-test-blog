const express = require("express");
const { verifyUser } = require("../controller/auth.controller");
const { getById } = require("../controller/user.controller");

const router = express.Router();

router.get("/:id", verifyUser, getById);

module.exports = router;
