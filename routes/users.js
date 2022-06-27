const express = require('express');
const {User} = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
const Joi = require('joi')
const router = express.Router();
const JWT_SECRET = 'kdhas9opydu91q123j124bmsadajhgjbaseuywgw4'

router.get('/:token', async (req, res) => {
  const token = req.params.token
  const decoded = jwt_decode(token)

  const user = await User.findById(decoded.id)

  if(!user) res.send({status: 'error', error: 'User not found'})

  res.send({status: 'ok', user: user})
})

module.exports = router

