const mongoose = require("mongoose");
const Team = require("./team.model");

const AccountSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Plase enter username"],
    },
    email: {
      type: String,
      required: [true, "Plase enter email"],
    },

    password: {
      type: String,
      required: [true, "Plase enter password"],
    },
    role: {
      type: String,
      default: "Individual",
    },
    userAvt: {
      type: String,
      required: false,
    },
    teams: {
      type: [
        {
          teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: false,
          },
          // teamName: {
          //   type: String,
          //   required: false,
          // },
        },
      ],
      default: [],
      require: false,
      _id: false,
    },
    currentWorkspace: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "workspaceType",
    },
    workspaceType: {
      type: String,
      enum: ["Individual", "Team"],
      default: "Individual",
    },
  },
  {
    timestamps: true,
  }
);

// middleware
// AccountSchema.pre("save", async function (next) {
//   if (this.isNew) {
//     try {
//       const individualTeam = new Team({
//         teamName: "Individual",
//         members: [{ userId: this._id, role: "Individual" }],
//         isIndividual: true,
//       });
//       await individualTeam.save();

//       this.teams.push({ teamId: individualTeam._id });
//       next();
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     next();
//   }
// });

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
