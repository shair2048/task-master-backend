const Team = require("../models/team.model");
const Account = require("../models/account.model.js");

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({});

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const createTeams = async (req, res) => {
//   try {
//     const team = await Team.create(req.body);

//     res.status(201).json(team);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const createTeams = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamName } = req.body;
    if (!id || !teamName) {
      return res.status(400).json({ message: "ID or team name is blank" });
    }

    const user = await Account.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const teamData = {
      teamName,
      members: [
        {
          userId: id,
          username: user.username,
          role: "Leader",
        },
      ],
    };

    const team = await Team.create(teamData);

    await Account.findByIdAndUpdate(id, {
      $push: {
        teams: {
          teamId: team._id,
          teamName: team.teamName,
        },
      },
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeams,
  createTeams,
};
