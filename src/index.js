//Archivo de Express, para iniciar el servidor
const exp = require('constants');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const {mongoose} = require('./database');

const app = express();

//Configuracion
app.set('port', process.env.PORT || 3000); //<-Le damos valor al puerto

//Funciones antes de que lleguen a las rutas 
app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/api/tasks' ,require('./routes/task.routes'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

//Empezar el servidor

app.listen(/*Puerto -> */app.get('port'), () => {
    console.log(`Server fachero ${app.get('port')}`); 
});
