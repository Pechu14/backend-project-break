
const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const router = require('./routes/productRoutes')

const { dbConnection } = require('./config/db');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('/public/images'));///comprobar que la ruta esta correcta


dbConnection()
app.use('/',router)


app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
});

