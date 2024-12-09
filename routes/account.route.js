const express = require("express");
const router = express.Router();
const Account = require("../models/account.model.js");
const {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/account.controller.js");

router.get("/", getAccounts);

router.get("/:id", getAccount);
// add account
router.post("/", createAccount);
// update account
router.put("/:id", updateAccount);
// delete account
router.delete("/:id", deleteAccount);

module.exports = router;
