const mongoose = require("mongoose");

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
      default: 0,
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
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
