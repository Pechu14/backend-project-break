const express = require('express')
const router = express.Router()
const ProductController =  require('../controllers/productController')


router.get('/create', ProductController.create)

module.exports = router