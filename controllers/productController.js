const Product = require('../models/Product');


const ProductController = {
  //para crear el producto con get
  create: async (req, res) => {
      
      try {
          const bodyProduct = req.body
          const product = await Product.create(bodyProduct) 
          res.status(201).json(product)
      } catch (error) {
          res
          .status(500)
          .json({message:'There was a problem trying to create a post',error:error.message})
      }
  },
}





module.exports = ProductController;