// const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// conectar la bd
db.authenticate()
    .then(() => console.log('Contectado a la bd!'))
    .catch(error => console.log(error));

// Puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear(); 
    res.locals.nombreSitio = 'Agencia de Viajes';
    return next();
});

// Agregar bodyparser para leer datos de formularios
app.use(express.urlencoded({extended: true}));

// Definir carpeta publica
app.use(express.static('public'));

// Agregar router
app.use('/', router)

app.listen(port, () => {
    console.log('Puerto:', port);
});