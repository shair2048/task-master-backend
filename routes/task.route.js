const express = require("express");
const router = express.Router();
const {
  getTask,
  getTaskByUserId,
  getTaskById,
  createTask,
} = require("../controllers/tasks.controller.js");

router.get("/", getTask);
router.post("/:id", createTask);
router.get("/user/:id", getTaskByUserId);
router.get("/:id", getTaskById);

module.exports = router;
