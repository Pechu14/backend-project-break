const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const multer = require('multer');


//multer para manejar las subidas de las fotos
const upload = multer({ dest: 'public/images' });

router.get('/dashboard/new', ProductController.showNewProduct);

router.post('/dashboard', ProductController.createProduct);

router.get('/products', ProductController.showProducts);

router.get('/products/:id', ProductController.showProductById);

router.post('/dashboard/:productId/delete', ProductController.deleteProduct);

router.get('/dashboard', ProductController.showDashboard);

router.get('/dashboard/:productId/edit', ProductController.showEditProduct);

router.put('/dashboard/:productId', ProductController.updateProduct);

router.get('/products/categoria/:category', ProductController.showProductsByCategory);




module.exports = router;