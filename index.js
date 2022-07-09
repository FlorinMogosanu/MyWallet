const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/user')
const bcrypt = require('bcrypt');
const { error } = require('console');
const jwt = require('jsonwebtoken');




require('./startup/db')()
require('./startup/routes')(app)

app.use('/static', express.static(path.join(__dirname, 'static')))




const port = process.env.PORT || 8080;
app.listen(port,()=>{
  console.log(`Server listening on port ${port}`);
})