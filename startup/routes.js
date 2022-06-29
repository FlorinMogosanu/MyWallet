const express = require('express');
const bodyParser = require('body-parser');
const registerUser = require('../routes/registerUser');
const loginUser = require('../routes/loginUser');
const user = require('../routes/users')
const transaction = require('../routes/transactions')

module.exports = function(app){
  app.use(bodyParser.json())
  app.use('/api/register', registerUser)
  app.use('/api/login', loginUser)
  app.use('/api/user', user)
  app.use('/api/transaction', transaction)
}