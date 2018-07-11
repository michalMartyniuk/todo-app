const express = require('express');
const app = express();
const port = process.env.PORT || 7000;
const api = require('./routes/api');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
})

mongoose.connect(keys.MONGO_URI)
  .then(() => console.log('Successfully connected to database'))
  .catch(() => console.log('Cannot connect to database'))

app.use('/api', api)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
  })
}

app.listen(port, () => console.log(`Server is running on port ${port}`));