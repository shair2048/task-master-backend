const express = require("express");
const router = express.Router();
const { registerAccount } = require("../controllers/register.controller.js");

router.post("/", registerAccount);

module.exports = router;
