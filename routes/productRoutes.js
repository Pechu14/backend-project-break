const express = require('express')
const router = express.Router()
const ProductController =  require('../controllers/productController')

// Middleware para analizar el cuerpo de las solicitudes JSON
router.use(express.json());

// Middleware para analizar los datos de formularios (application/x-www-form-urlencoded)
router.use(express.urlencoded({ extended: true }));


//router.post('/dashboard', ProductController.create)

router.get('/dashboard/form', ProductController.getCreateProductFormView)

router.post('/dashboard', (req, res) => {
    const { nombre, descripcion, categoria, talla, precio } = req.body;
  
    // Llama al controlador de productos para crear un nuevo producto
    ProductController.create(req, res);
  });

  /////////////////////////cambiar el create////////////////////////////////////////

module.exports = router