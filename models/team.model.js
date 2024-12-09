const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema(
  {
    team_name: {
      type: String,
      required: true,
    },
    members: {
      type: [
        {
          user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
          },
          user_name: {
            type: String,
            required: false,
          },
          role: {
            type: String,
            enum: ["leader", "member"],
            required: true,
          },
        },
      ],
      default: [],
      _id: false,
    },
    teamAvt: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;
