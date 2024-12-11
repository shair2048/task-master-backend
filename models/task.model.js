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

    assignTo: {
      type: [
        {
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
      ],
      default: [],
      require: false,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      require: true,
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
      required: true,
    },
    teams: {
      type: {
        teamId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
          require: true,
        },
        teamName: {
          type: String,
          required: true,
        },
      },
      require: false,
      _id: false,
    },
    taskStatus: {
      type: String,
      enum: ["To do", "In Progress", "Done"],
      default: "To do",
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
