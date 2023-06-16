const mongoose = require('mongoose');
const {mongodb} = require('./keys');

mongoose.connect(mongodb.URI, {})
  .then(db => console.log('Conectado a Mongo Atlas'))
  .catch(err => console.log(err))