
const express = require("express");
const dotenv = require('dotenv');
const router = require('./routes/productRoutes')
const { dbConnection } = require('./config/db');
const path = require('path');
const productAPIRoutes = require('./routes/productAPIRoutes');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));


// para React, configura CORS para permitir solicitudes del frontend
//const cors = require('cors');
//app.use(cors({ origin: `http://${HOST}` }));


app.use(methodOverride('_method'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(productAPIRoutes);


dbConnection()
app.use('/', router)


app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
});

