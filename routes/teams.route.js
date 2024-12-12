const express = require("express");
const router = express.Router();
const { getTeams, getTeam, createTeams } = require("../controllers/teams.controller.js");
const { route } = require("./account.route.js");

router.get("/", getTeams);
router.get("/:id", getTeam);
router.post("/:id", createTeams);

module.exports = router;
