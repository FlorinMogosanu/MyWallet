const express = require('express');
const app = express();
const {User, validate} = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
const router = express.Router();
const JWT_SECRET = 'kdhas9opydu91q123j124bmsadajhgjbaseuywgw4'

router.post('/:token', async (req, res) =>{
  try{
  const token = req.params.token
  const decoded = jwt_decode(token)
  const user = await User.findById(decoded.id)
  if(!user) return res.send({status: 'error', error: 'User not found'})

  const transaction = {
    type: req.body.type,
    category: req.body.type,
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date,
  }

  if(transaction.type === 'expense'){
    user.balance = user.balance - transaction.amount
    user.expenseValue = transaction.amount + user.expenseValue
    const category = user.outcomeCategories.find(cat => cat.name === transaction.category)
    const indexOfCategory = user.outcomeCategories.indexOf(category)
    const newValue = user.outcomeCategories[indexOfCategory].value + transaction.amount
    user.outcomeCategories[indexOfCategory] = {
      name: transaction.category,
      value: newValue,
      color: '#E9C6FF',
      image: '/static/images/expenses/transport.png',
    }
  }
  
  console.log(user)
  user.transactions.unshift(transaction)
  await user.save()

  res.send({status: 'ok'})
}
catch(err){
  return res.json({status: 'error', error: err.message});
}
})


module.exports = router