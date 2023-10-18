const express = require("express");
const app = express();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const router = express.Router();
const JWT_SECRET = "kdhas9opydu91q123j124bmsadajhgjbaseuywgw4";

router.post("/:token", async (req, res) => {
  res.setHeader("Acces-Control-Allow-Origin", "http://localhost:3000/");
  try {
    const token = req.params.token;
    const decoded = jwt_decode(token);
    const user = await User.findById(decoded.id);
    if (!user) return res.send({ status: "error", error: "User not found" });

    const transaction = {
      type: req.body.type,
      category: req.body.category,
      description: req.body.description,
      amount: req.body.amount,
      date: req.body.date,
    };

    if (transaction.type === "expense") {
      user.balance = user.balance - transaction.amount;
      const monthIndex =
        parseInt(`${transaction.date[5]}${transaction.date[6]}`) - 1;
      user.expenseValue = user.expenseValue + transaction.amount;
      const category = user.outcomeCategories.find(
        (cat) => cat.name === transaction.category
      );
      const indexOfCategory = user.outcomeCategories.indexOf(category);
      const newValue =
        user.outcomeCategories[indexOfCategory].value + transaction.amount;
      user.outcomeCategories[indexOfCategory] = {
        name: transaction.category,
        value: newValue,
        color: user.outcomeCategories[indexOfCategory].color,
        image: user.outcomeCategories[indexOfCategory].image,
      };

      user.balancePerMonth[monthIndex] = {
        month: user.balancePerMonth[monthIndex].month,
        value: user.balance,
      };

      user.transactions.unshift(transaction);
    } else if (transaction.type === "income") {
      const category = user.incomeCategories.find(
        (cat) => cat.name === transaction.category
      );
      const indexOfCategory = user.incomeCategories.indexOf(category);
      const newValue =
        user.incomeCategories[indexOfCategory].value + transaction.amount;
      let demoValue = 0;
      user.incomeCategories[indexOfCategory] = {
        name: transaction.category,
        value: newValue,
        color: user.incomeCategories[indexOfCategory].color,
        image: user.incomeCategories[indexOfCategory].image,
      };
      user.incomeValue = user.incomeValue + transaction.amount;

      if (user.savingItems.length > 0) {
        user.savingItems.forEach((item) => {
          const savedAmount = transaction.amount * (item.percentage / 100);
          const indexOfItem = user.savingItems.indexOf(item);
          demoValue = transaction.amount - savedAmount;
          const saved = user.savingItems[indexOfItem].savedValue + savedAmount;

          user.savedValue = savedAmount + user.savedValue;

          user.savingItems[indexOfItem] = {
            name: item.name,
            value: item.value,
            savedValue: saved,
            percentage: item.percentage,
            color: item.color,
            image: item.image,
          };

          if (
            user.savingItems[indexOfItem].savedValue >=
            user.savingItems[indexOfItem].value
          ) {
            user.savingItems.splice(indexOfItem, 1);
          }
        });
      }
      const monthIndex =
        parseInt(`${transaction.date[5]}${transaction.date[6]}`) - 1;
      if (demoValue === 0) {
        user.balance = user.balance + transaction.amount;
      } else if (demoValue > 0) {
        user.balance = user.balance + demoValue;
      }

      user.balancePerMonth[monthIndex] = {
        month: user.balancePerMonth[monthIndex].month,
        value: user.balance,
      };
      user.transactions.unshift(transaction);
    }

    // console.log(user)
    await user.save();

    res.send({ status: "ok" });
  } catch (err) {
    return res.json({ status: "error", error: err.message });
  }
});

module.exports = router;
