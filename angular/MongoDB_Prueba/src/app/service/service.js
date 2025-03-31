// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://GestionMultimedia_Prueba', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});