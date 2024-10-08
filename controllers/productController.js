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
  getCreateProductFormView:  async (req, res) => {
      
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Example Page</title>
      </head>
      <body>
        <h1>Hello, this is an example page!</h1>
      </body>
      </html>
    `;
  
    res.send(htmlContent);

},
}





module.exports = ProductController;