const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const multer = require('multer');


// Usa multer para manejar las subidas de archivos
const upload = multer({ dest: 'public/images' });

// Ruta para mostrar el formulario
router.get('/dashboard/new', ProductController.getCreateProductFormView);
//RUTA GEt para acceder a create si estas en el dashboard????igal a la get dashboard/new
//router.get('/dashboard/create', ProductController.getCreateProductFormView);

// Ruta para manejar la creación del producto (usa multer para manejar la subida de archivos)
router.post('/dashboard', upload.single('imagen'), ProductController.create);

// Ruta GET para mostrar todos los productos
router.get('/products', ProductController.showProducts);

// Ruta GET para ver el detalle de un producto por su ID
router.get('/products/:id', ProductController.showProductById);

// Ruta para eliminar un producto
router.post('/dashboard/:productId/delete', ProductController.deleteProduct);

// Rutas para el dashboard
router.get('/dashboard', ProductController.showDashboard); // Ruta para el dashboard



/////////probar o se borra//////////

// Ruta para el dashboard
//router.get('/dashboard', ProductController.showDashboard); // Asegúrate de que esta línea esté en el archivo correcto

// Otras rutas de productos
//router.get('/', ProductController.showProducts); // Ruta para mostrar todos los productos








module.exports = router;