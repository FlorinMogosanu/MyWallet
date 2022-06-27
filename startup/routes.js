const express = require('express');
const bodyParser = require('body-parser');
const registerUser = require('../routes/registerUser')

module.exports = function(app){
  app.use(bodyParser.json())
  app.use('/api/register', registerUser)
}