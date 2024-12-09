const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema(
  {
    team_name: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;
