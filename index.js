const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/user')
const bcrypt = require('bcrypt');
const { error } = require('console');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'kdhas9opydu91q123j124bmsadajhgjbaseuywgw4'

require('./startup/db')()

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.post('/api/register', async (req, res) => {
  const {username, email , password: plainTextPassword} = req.body
  const password = await bcrypt.hash(plainTextPassword,10)

  if(!username || !email || !plainTextPassword) return res.json({status: error, error: 'All fields must be provided'})

  try{
    const user = await User.create({
      username,
      email,
      password
    })
    console.log('user created successfully',user)
    const token = jwt.sign({id:user._id, email:user.email}, JWT_SECRET)
    res.json({status: 'ok', data: token})
  }
  catch(err){
    if(err.code === 11000) return res.json({status: error, error: 'User with the email registered already exists'})
    return res.json({status: 'error', error: err.code});
  }

  
})

const port = process.env.PORT || 5500;
app.listen(port,()=>{
  console.log(`Server listening on port ${port}`);
})