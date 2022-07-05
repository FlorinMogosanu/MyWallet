const express = require('express');
const app = express();
const {User, validate} = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
const router = express.Router();
const JWT_SECRET = 'kdhas9opydu91q123j124bmsadajhgjbaseuywgw4'

router.get('/:token', async (req, res) => {
  try{
    const token = req.params.token
    const decoded = jwt_decode(token)
    const user = await User.findById(decoded.id)
    if(!user) return res.send({status: 'error', error: 'User not found'})

    if(user.currency === '$'){
      return res.json({status: 'ok', currency: 'USD'})
    }
    if(user.currency === '£'){
      return res.json({status: 'ok', currency: 'GBP'})
    }
    if(user.currency === '€'){
      return res.json({status: 'ok', currency: 'EUR'})
    }
    if(user.currency === 'LEI'){
      return res.json({status: 'ok', currency: 'RON'})
    }
  }
  catch(err) {
    return res.json({status: 'error', error: err.message});
  }

})

router.post('/:token', async (req, res) => {
  try{
    const token = req.params.token
    const decoded = jwt_decode(token)
    const user = await User.findById(decoded.id)
    if(!user) return res.json({status: 'error', error: 'User not found'})

    const currency = req.body.currency

    if(currency === 'USD'){
      user.currency = '$'
      await user.save()
      return res.json({status: 'ok'})
    }
    if(currency === 'EUR'){
      user.currency = '€'
      await user.save()
      return res.json({status: 'ok'})
    }
    if(currency === 'GBP'){
      user.currency = '£'
      await user.save()
      return res.json({status: 'ok'})
    }
    if(currency === 'RON'){
      user.currency = 'LEI'
      await user.save()
      return res.json({status: 'ok'})
    }
  }
  catch(err){
    return res.json({status: 'error', error: err.message});
  }
})


module.exports = router