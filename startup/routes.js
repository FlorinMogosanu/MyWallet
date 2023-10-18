const express = require("express");
const bodyParser = require("body-parser");
const registerUser = require("../routes/registerUser");
const loginUser = require("../routes/loginUser");
const user = require("../routes/users");
const transaction = require("../routes/transactions");
const saving = require("../routes/saving");
const currency = require("../routes/currency");
const update = require("../routes/update");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use("../routes/registerUser", registerUser);
  app.use("../routes/loginUser", loginUser);
  app.use("../routes/user", user);
  app.use("../routes/transaction", transaction);
  app.use("../routes/saving", saving);
  app.use("../routes/currency", currency);
  app.use("../routes/update", update);
};
