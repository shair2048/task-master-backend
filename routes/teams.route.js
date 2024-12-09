const express = require("express");
const router = express.Router();
const { getTeams, createTeams } = require("../controllers/teams.controller.js");

router.get("/", getTeams);
router.post("/", createTeams);

module.exports = router;
