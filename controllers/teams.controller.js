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

const getTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeamByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    // const user = await Account.findById(id).select("teams");

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    const teams = await Team.find({ "members.userId": id });
    // console.log(teams);

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTeams = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamName, memberId } = req.body;
    if (!id || !teamName) {
      return res.status(400).json({ message: "ID or team name is blank" });
    }

    const user = await Account.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const memberList = [];
    const member = await Account.findById(memberId);
    if (!member) {
      return res
        .status(404)
        .json({ message: `Member with ID ${memberId} does not exist` });
    }

    memberList.push({
      userId: member._id,
      username: member.username,
      role: "Member",
    });

    const teamData = {
      teamName,
      members: [
        {
          userId: id,
          role: "Leader",
        },
        ...memberList,
      ],
    };

    const team = await Team.create(teamData);

    await Account.findByIdAndUpdate(id, {
      $push: {
        teams: {
          teamId: team._id,
        },
      },
    });

    for (const member of memberList) {
      await Account.findByIdAndUpdate(member.userId, {
        $push: {
          teams: {
            teamId: team._id,
          },
        },
      });
    }

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeams,
  getTeam,
  getTeamByUserId,
  createTeams,
};
