const Account = require("../models/account.model.js");
const bcrypt = require("bcrypt");

const registerAccount = async (req, res) => {
  try {
    const { email, password } = await Account.create(req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    res.status(201).json({ message: "Registration successful" });

    // const hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAccount,
};
