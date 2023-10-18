const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://Cris24dc:24122003@mywallet.kjcjvn0.mongodb.net/MyWallet"
    )
    .then(() => {
      console.log("Connected to MongoDB...");
    });
};
