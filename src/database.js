//Archivo para conectar a la base de datos
const { MONGO_CLIENT_EVENTS } = require('mongodb');
const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1/mern-tasks';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;