const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Account = require("./models/account.model.js");
const accountRoute = require("./routes/account.route.js");
const registerRoute = require("./routes/register.route.js");
const loginRoute = require("./routes/login.route.js");

const app = express();
const port = 3000;

// middleware
app.use(express.json());

// routes
app.use("/api/account", accountRoute);
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);

mongoose
  .connect(
    "mongodb+srv://shair:shair2048@backenddb.icasu.mongodb.net/task-master?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => console.log("Connection failed!"));
