const Team = require("../models/team.model");
const Account = require("../models/account.model.js");
const Task = require("../models/task.model.js");

const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({});

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTaskByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const tasks = await Task.find({ "createdBy.userId": id });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, taskDescription, priority, deadline } = req.body;
    if (!id || !taskName) {
      return res.status(400).json({
        message: "ID or taskName, taskDescription, deadline is blank",
      });
    }

    const user = await Account.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const taskData = {
      taskName,
      taskDescription,
      priority,
      deadline,
      createdBy: {
        userId: id,
        username: user.username,
      },
    };

    // console.log(taskData);
    const task = await Task.create(taskData);

    // await Account.findByIdAndUpdate(id, {
    //   $push: {
    //     teams: {
    //       teamId: task._id,
    //       teamName: task.teamName,
    //     },
    //   },
    // });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTask,
  getTaskByUserId,
  getTaskById,
  createTask,
};
