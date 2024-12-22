const express = require("express");
const router = express.Router();
const {
  getTask,
  getTaskByUserId,
  getTaskByWorkspace,
  getTaskById,
  changeTaskStatus,
  createTask,
} = require("../controllers/tasks.controller.js");

router.get("/", getTask);
router.post("/create", createTask);
router.get("/user/:userId", getTaskByUserId);
router.get("/workspace/:teamId", getTaskByWorkspace);
router.get("/:id", getTaskById);
router.put("/:id", changeTaskStatus);

module.exports = router;
