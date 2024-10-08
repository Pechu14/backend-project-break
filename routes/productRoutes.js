const express = require('express')
const router = express.Router()
const ProductController =  require('../controllers/productController')


router.post('/dashboard', ProductController.create)

router.get('/dashboard/new', ProductController.getCreateProductFormView)

module.exports = router