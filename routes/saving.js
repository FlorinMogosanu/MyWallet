const express = require('express');
const app = express();
const {User, validate} = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
const router = express.Router();
const JWT_SECRET = 'kdhas9opydu91q123j124bmsadajhgjbaseuywgw4'

router.post('/:token', async(req,res) => {
  try{
    const token = req.params.token
    const decoded = jwt_decode(token)
    const user = await User.findById(decoded.id)
    if(!user) return res.send({status: 'error', error: 'User not found'})

    const saving = {
      name: req.body.name,
      value: req.body.value,
      savedValue: req.body.savedValue,
      percentage: req.body.percentage,
      color: req.body.color,
      image: req.body.image,
    }
    user.savingItems.unshift(saving)

    await user.save()

    return res.json({status: 'ok'})
  }
  catch(err){
    return res.json({status: 'error', error: err.message});
  }
})

router.delete('/:token/:index', async(req,res) =>{
  try{
  const token = req.params.token
  const decoded = jwt_decode(token)
  const user = await User.findById(decoded.id)
  const index = req.params.index
  if(!user) return res.json({status: 'error', error: 'User not found'})
  user.savingItems.splice(index, 1)

  await user.save()
  res.json({status: 'ok'})
  }
  catch{
    return res.json({status: 'error', error: err.message});
  }
})


module.exports = router