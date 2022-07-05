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
  app.use('/api/register', registerUser)
  app.use('/api/login', loginUser)
  app.use('/api/user', user)
  app.use('/api/transaction', transaction)
  app.use('/api/saving', saving)
  app.use('/api/currency', currency)
  app.use('/api/update', update)
}