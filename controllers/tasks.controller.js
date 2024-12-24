const Team = require("../models/team.model");
const Account = require("../models/account.model.js");
const Task = require("../models/task.model.js");
const { format } = require("date-fns");

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
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const tasks = await Task.find({ "createdBy.userId": userId });

    // if (tasks.length === 0) {
    //   return res.status(404).json({ message: "No tasks found for this user" });
    // }

    if (!tasks.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskByWorkspace = async (req, res) => {
  try {
    const { teamId } = req.params;
    // console.log("teamId", teamId);

    if (!teamId) {
      return res.status(200).json([]);
    }

    const tasks = await Task.find({
      "teams.teamId": teamId,
    });

    const formattedTasks = tasks.map((task) => ({
      ...task._doc,
      deadline: format(new Date(task.deadline), "dd-MM-yyyy"),
      createdAt: format(new Date(task.createdAt), "dd-MM-yyyy"),
    }));

    res.status(200).json(formattedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    const formattedTask = {
      ...task._doc,
      deadline: format(new Date(task.deadline), "dd-MM-yyyy"),
      createdAt: format(new Date(task.createdAt), "dd-MM-yyyy"),
      updatedAt: format(new Date(task.updatedAt), "dd-MM-yyyy"),
    };

    res.status(200).json(formattedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskStatus } = req.body;

    await Task.findByIdAndUpdate(id, { taskStatus });

    const updatedTask = await Task.findById(id);

    res.status(201).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    // const { id } = req.params;
    const { id, teamId } = req.query;
    const { taskName, taskDescription, assignTo, priority, deadline } =
      req.body;

    if (!id || !taskName) {
      return res.status(400).json({
        message: "ID or taskName, taskDescription, deadline is blank",
      });
    }

    const taskData = {
      taskName,
      taskDescription,
      // assignTo: {
      //   userId: assignTo,
      // },
      priority,
      deadline,
      createdBy: {
        userId: id,
      },
      teams: {
        teamId: teamId,
      },
    };

    if (assignTo) {
      taskData.assignTo = assignTo.map((userId) => ({ userId }));
    }

    // console.log(taskData);
    const task = await Task.create(taskData);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTask,
  getTaskByUserId,
  getTaskByWorkspace,
  getTaskById,
  changeTaskStatus,
  createTask,
};
