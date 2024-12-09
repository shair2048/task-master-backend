const jwt = require("jsonwebtoken");
const Account = require("../models/account.model.js");

const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Account.findOne({ email });
    const uid = user._id;
    const role = user.role;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }
    const isPasswordValid = await Account.findOne({ password });
    if (!isPasswordValid) {
      return res.status(404).json({ message: "Password is wrong" });
    }

    const token = jwt.sign({ id: uid }, "ijhnciujahnihiuh98729873109", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token, uid, role });

    // const hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginAccount,
};
