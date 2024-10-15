const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const multer = require('multer');


// Usa multer para manejar las subidas de archivos
const upload = multer({ dest: 'public/images' });

// Ruta para mostrar el formulario
router.get('/dashboard/new', ProductController.showNewProduct);

// Ruta para manejar la creación del producto (usa multer para manejar la subida de archivos)
router.post('/dashboard', ProductController.createProduct);

// Ruta GET para mostrar todos los productos
router.get('/products', ProductController.showProducts);

// Ruta GET para ver el detalle de un producto por su ID
router.get('/products/:id', ProductController.showProductById);

// Ruta para eliminar un producto
router.post('/dashboard/:productId/delete', ProductController.deleteProduct);

// Rutas para el dashboard
router.get('/dashboard', ProductController.showDashboard);


// Ruta para obtener el formulario de editar producto
router.get('/dashboard/:productId/edit', ProductController.showEditProduct);


// Ruta para actualizar un producto
router.put('/dashboard/:productId', ProductController.updateProduct);

// Ruta para mostrar productos por categoría
router.get('/products/categoria/:category', ProductController.showProductsByCategory);




module.exports = router;