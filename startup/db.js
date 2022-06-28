
const mongoose = require('mongoose');

module.exports = function(){
  mongoose.connect('mongodb://localhost/myWallet')
  .then(() => {
    console.log('Connected to MongoDB...')
  })
}