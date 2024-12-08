const express = require("express");
const router = express.Router();
const { loginAccount } = require("../controllers/login.controller.js");

router.post("/", loginAccount);

module.exports = router;
