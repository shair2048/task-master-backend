const Team = require("../models/team.model");

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({});

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTeams = async (req, res) => {
  try {
    const team_name = await Team.create(req.body);

    res.status(201).json(team_name);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeams,
  createTeams,
};
