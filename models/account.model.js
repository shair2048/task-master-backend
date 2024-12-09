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
      default: "individual",
    },
    userAvt: {
      type: String,
      required: false,
    },
    teams: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
