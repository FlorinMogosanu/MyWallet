const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(URI)
    .then(() => {
      console.log("Connected to MongoDB...");
    });
};
