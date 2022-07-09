const express = require('express');
const bodyParser = require('body-parser');
const registerUser = require('../routes/registerUser');
const loginUser = require('../routes/loginUser');
const user = require('../routes/users')
const transaction = require('../routes/transactions')
const saving = require('../routes/saving')
const currency = require('../routes/currency');
const update = require('../routes/update')

module.exports = function(app){
  app.use(bodyParser.json())
  app.use('https://turuiup.com/api/register', registerUser)
  app.use('https://turuiup.com/api/login', loginUser)
  app.use('https://turuiup.com/api/user', user)
  app.use('https://turuiup.com/api/transaction', transaction)
  app.use('https://turuiup.com/api/saving', saving)
  app.use('https://turuiup.com/api/currency', currency)
  app.use('https://turuiup.com/api/update', update)
}