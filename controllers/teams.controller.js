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
    const { team_name } = req.body;
    if (!id || !team_name) {
      return res.status(400).json({ message: "ID or team name is blank" });
    }

    const user = await Account.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const teamData = {
      team_name,
      members: [
        {
          user_id: id,
          user_name: user.username,
          role: "leader",
        },
      ],
    };

    const team = await Team.create(teamData);

    await Account.findByIdAndUpdate(id, {
      $push: {
        teams: {
          team_id: team._id,
          team_name: team.team_name,
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
