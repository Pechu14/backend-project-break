const Product = require('../models/Product');

const ProductAPIController = {
  
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
  },

 
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
  },

 
  createProduct: async (req, res) => {
    try {
      const { nombre, descripcion, categoria, talla, precio } = req.body;
      let imagen = '';

      if (req.file) {
        imagen = req.file.filename;
      }

      const newProduct = new Product({
        nombre,
        descripcion,
        categoria,
        talla,
        precio,
        imagen
      });

      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
  },

  
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      if (req.file) {
        updatedData.imagen = req.file.filename;
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
  },

  
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto eliminado correctamente: ' + deletedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
  }
};

module.exports = ProductAPIController;
