
const express = require("express");
const dotenv = require('dotenv');
const router = require('./routes/productRoutes')
const { dbConnection } = require('./config/db');
const path = require('path');
const productAPIRoutes = require('./routes/productAPIRoutes');
const methodOverride = require('method-override');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//  OJO para React, configura CORS para permitir solicitudes del frontend
//const cors = require('cors');
//app.use(cors({ origin: `http://${HOST}:${PORT}` }));


// Configuración del middleware
app.use(methodOverride('_method'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));///comprobar que la ruta esta correcta


// Uso de las rutas de la API de productos
app.use(productAPIRoutes);


dbConnection()
app.use('/', router)


app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
});

