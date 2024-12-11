const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Account",
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        _id: false,
      },
    },
    teams: {
      type: {
        teamId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
        },
        teamName: {
          type: String,
        },
      },
      require: false,
      _id: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
