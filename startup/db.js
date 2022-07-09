
const mongoose = require('mongoose');

module.exports = function(){
  mongoose.connect('mongodb+srv://Florin:parola@mywallet.5vvy4vh.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB...')
  })
}