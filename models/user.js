const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance:{
    type: Number,
    default: 0,
  },
  incomeValue: {
    type: Number,
    default: 0,
  },
  expenseValue: {
    type: Number,
    default: 0,
  },
  savedValue:{
    type: Number,
    default: 0,
  },
  transactions:{
    type: Array,
    default: [],
  },
  incomeCategories:{
    type: Array,
    default: [

    ],
  },
  outcomeCategories:{
    type: Array,
    default: [
      {
        name: 'Food',
        value: 0,
        color: '#95D8AF',
        image: '/static/images/expenses/food.png',
      },
      {
        name: 'Transport',
        value: 0,
        color: '#E9C6FF',
        image: '/static/images/expenses/transport.png',
      },
      {
        name: 'Utility',
        value: 0,
        color: '#FFEDAB',
        image: '/static/images/expenses/utility.png',
      },
      {
        name: 'Medication',
        value: 0,
        color: '#D4F986',
        image: '/static/images/expenses/medication.png',
      },
      {
        name: 'Travel',
        value: 0,
        color: '#92E5FF',
        image: '/static/images/expenses/travel.png',
      },
      {
        name: 'Clothes',
        value: 0,
        color: '#B3FFE4',
        image: '/static/images/expenses/clothes.png',
      },
      {
        name: 'Insurance',
        value: 0,
        color: '#EA78BE',
        image: '/static/images/expenses/insurance.png',
      },
      {
        name: 'Education',
        value: 0,
        color: '#7888EA',
        image: '/static/images/expenses/education.png',
      },
      {
        name: 'Other',
        value: 0,
        color: '#EA7878',
        image: '/static/images/expenses/other.png',
      }
    ],
  },
  savingItems:{
    type: Array,
    default: [],
  },
})

const User = mongoose.model('User', userSchema)

function validateUser(user){
  const schema = Joi.object().keys({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  })

  return schema.validate(user)
}

module.exports.User = User;
module.exports.validate = validateUser;