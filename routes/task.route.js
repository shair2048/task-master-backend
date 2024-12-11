const express = require("express");
const router = express.Router();
const {
  getTask,
  getTaskByUserId,
  createTask,
} = require("../controllers/tasks.controller.js");

router.get("/", getTask);
router.post("/:id", createTask);
router.get("/:id", getTaskByUserId);

module.exports = router;
