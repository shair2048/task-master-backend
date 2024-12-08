const express = require("express");
const router = express.Router();
const Account = require("../models/account.model.js");
const {
  getAccounts,
  getProduct,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/account.controller.js");

router.get("/", getAccounts);

// router.get("/:id", getAccounts);
router.post("/", createAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

module.exports = router;
