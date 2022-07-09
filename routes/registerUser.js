const express = require('express');
const app = express();
const {User, validate} = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = 'kdhas9opydu91q123j124bmsadajhgjbaseuywgw4'

router.post('/', async (req, res) => {
  res.setHeader('Acces-Control-Allow-Origin', "http://34.76.29.36:8080")
  const {error} = validate(req.body)
  if(error) return res.json({status: 'error', error: error.message})


  const {firstName, lastName, email , password: plainTextPassword} = req.body
  const password = await bcrypt.hash(plainTextPassword,10)

  if(!firstName || !lastName || !email || !plainTextPassword) return res.json({status: error, error: 'All fields must be provided'})

  try{
    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    })
    console.log('user created successfully',user)
    const token = jwt.sign({id:user._id, email:user.email}, JWT_SECRET)
    res.json({status: 'ok', data: token})
  }
  catch(err){
    if(err.code === 11000) return res.json({status: 'error', error: 'User with the email registered already exists'})
    return res.json({status: 'error', error: err.message});
  }
})

module.exports = router