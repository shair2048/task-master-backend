const express = require("express");
const router = express.Router();
const {
  getTeams,
  getTeam,
  getTeamByUserId,
  createTeams,
} = require("../controllers/teams.controller.js");
const { route } = require("./account.route.js");

router.get("/", getTeams);
router.get("/:id", getTeam);
router.get("/user/:id", getTeamByUserId);
router.post("/user/:id", createTeams);

module.exports = router;
