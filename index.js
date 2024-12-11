const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Account = require("./models/account.model.js");
const accountRoute = require("./routes/account.route.js");
const registerRoute = require("./routes/register.route.js");
const loginRoute = require("./routes/login.route.js");
const teamRoute = require("./routes/teams.route.js");
const taskRoute = require("./routes/task.route.js");

const cors = require("cors");

const app = express();
const port = 3000;

const allowedOrigins = ["http://localhost:8081"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Các phương thức HTTP được cho phép
  allowedHeaders: ["Content-Type", "Authorization"], // Các header được cho phép
  credentials: true,
};

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// routes
app.use("/api/account", accountRoute);
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/teams", teamRoute);
app.use("/api/tasks", taskRoute);

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
