
const express = require("express");
const dotenv = require('dotenv');
const router = require('./routes/productRoutes')
const path = require('path');


const { dbConnection } = require('./config/db');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


const methodOverride = require('method-override');

// Configuración del middleware
app.use(methodOverride('_method'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));///comprobar que la ruta esta correcta


dbConnection()
app.use('/', router)


app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
});

