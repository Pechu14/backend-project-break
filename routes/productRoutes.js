const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const multer = require('multer');

// Usa multer para manejar las subidas de archivos
const upload = multer({ dest: 'public/images' });

// Ruta para mostrar el formulario
router.get('/dashboard/new', ProductController.getCreateProductFormView);

// Ruta para manejar la creación del producto (usa multer para manejar la subida de archivos)
router.post('/dashboard', upload.single('imagen'), ProductController.create);


module.exports = router;