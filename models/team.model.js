const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    members: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
          },
          // username: {
          //   type: String,
          //   required: false,
          // },
          role: {
            type: String,
            enum: ["Individual", "Leader", "Member"],
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
    isIndividual: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;
