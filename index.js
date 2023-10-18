const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { error } = require("console");
const jwt = require("jsonwebtoken");

require("./startup/db")();
require("./startup/routes")(app);

app.use(express.static("static"));
app.use("/pages", express.static(__dirname + "static/pages"));
app.use("/css", express.static(__dirname + "static/css"));
app.use("/images", express.static(__dirname + "static/images"));
app.use("/scripts", express.static(__dirname + "static/scripts"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
