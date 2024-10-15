// controllers/ProductAPIController.js

const Product = require('../models/Product'); // Asegúrate de que el modelo está importado

const ProductAPIController = {
  // Obtener todos los productos
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products); // Devuelve los productos en formato JSON
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
  },

  // Obtener un producto por ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(product); // Devuelve el producto en formato JSON
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
  },

  // Crear un nuevo producto
  createProduct: async (req, res) => {
    try {
      const { nombre, descripcion, categoria, talla, precio } = req.body;
      let imagen = '';

      if (req.file) {
        imagen = req.file.filename; // El nombre del archivo de imagen subido
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
      res.status(201).json(savedProduct); // Devuelve el producto creado en formato JSON
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
  },

  // Actualizar un producto
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      if (req.file) {
        updatedData.imagen = req.file.filename; // Si se sube una nueva imagen, se actualiza el campo
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(updatedProduct); // Devuelve el producto actualizado en formato JSON
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
  },

  // Eliminar un producto
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
