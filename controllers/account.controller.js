const Account = require("../models/account.model.js");
const Task = require("../models/task.model.js");
const Team = require("../models/team.model.js");

const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({});
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAccount = async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndUpdate(id, req.body);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    const updatedAccount = await Account.findById(id);
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    // const account = await Account.findByIdAndDelete(id);
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    await Task.deleteMany({ "createdBy.userId": id });
    await Team.updateMany(
      { "members.userId": id },
      { $pull: { members: { userId: id } } }
    );
    await Account.findByIdAndDelete(id);

    // const teamsCreatedByUser = await Team.find({
    //   "members.role": "Leader",
    //   "members.userId": id,
    // });
    // const teamIdsToDelete = teamsCreatedByUser.map((team) => team._id);
    // await Team.deleteMany({ _id: { $in: teamIdsToDelete } });

    res.status(200).json({ message: "Account deleted success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
};
