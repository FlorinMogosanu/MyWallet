const express = require('express');
const bodyParser = require('body-parser');
const registerUser = require('../routes/registerUser');
const loginUser = require('../routes/loginUser');
const user = require('../routes/users')
const { application } = require('express');

module.exports = function(app){
  app.use(bodyParser.json())
  app.use('/api/register', registerUser)
  app.use('/api/login', loginUser)
  app.use('/api/user', user)
}