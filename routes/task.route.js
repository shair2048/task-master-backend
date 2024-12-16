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
router.post("/user/:id", createTask);
router.get("/user/:id", getTaskByUserId);
router.get("/workspace/", getTaskByWorkspace);
router.get("/:id", getTaskById);
router.put("/:id", changeTaskStatus);

module.exports = router;
