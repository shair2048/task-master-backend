const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Plase enter email"],
    },

    password: {
      type: String,
      required: [true, "Plase enter password"],
      default: 0,
    },
    userAvt: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
