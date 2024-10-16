const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
require('dotenv').config();


//Para los html
const createProductFormView = require('../views/createProductFormView.ts');
const productsListView = require('../views/productsListView.ts');
const editProductView = require('../views/editProductView.ts');
const htmlById = require('../views/productsByIdview.ts');
const htmlDashboard = require('../views/showDashboardView.ts');
const htmlCategory = require('../views/productsByCategory.ts');




// Configuración de multer para el manejo de las fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });



const ProductController = {

  showNewProduct: async (req, res) => {
    const htmlForm = createProductFormView;
    res.send(htmlForm);
  },

  
  createProduct: async (req, res) => {
    try {
      const { nombre, descripcion, categoria, talla, precio, imagen } = req.body;
     
      if (req.file) {
        imagen = req.file.filename;
      }

      const product = await Product.create({
        nombre,
        descripcion,
        categoria,
        talla,
        precio,
        imagen
      });

      res.status(201).json(product);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Problema al crear el producto',
          error: error.message
        });
    }
  },
  
  showProducts: async (req, res) => {
    const { HOST, PORT } = process.env;
    try {
      const products = await Product.find();
      let htmlShowProducts = productsListView;
      
      products.forEach(product => {
        htmlShowProducts += `
          <div class="product-item">
            <img src="http://${HOST}:${PORT}/public/images/${product.imagen}" alt="${product.nombre}">
            <h2>${product.nombre}</h2>
            <p>${product.descripcion}</p>
            <p>Precio: ${product.precio}€</p>
            <a href="/products/${product._id}">Ver detalle</a>
          </div>
        `;
      });

      htmlShowProducts += `
          </div>
        </body>
        </html>
      `;

      res.send(htmlShowProducts);
    } catch (error) {
      res.status(500).send('Error al cargar los productos: ' + error.message);
    }
  
  },

  
   showProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      const html = htmlById(product)
      res.send(html);
    } catch (error) {
      res.status(500).send('Error al cargar el producto: ' + error.message);
    }
  },


  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      await Product.findByIdAndDelete(productId);
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error eliminando el producto:', error);
      res.status(500).send('Error al eliminar el producto');
    }
  },


showDashboard: async (req, res) => {
  const { HOST, PORT } = process.env;
  try {
      const products = await Product.find();
      let productCards = '<div class="product-list">';

      products.forEach(product => {
          productCards += `
              <div class="product-card">
                  <img src="http://${HOST}:${PORT}/public/images/${product.imagen}" alt="${product.nombre}">
                  <h2>${product.nombre}</h2>
                  <p>${product.descripcion}</p>
                  <p>${product.precio}€</p>
                  <p>ID: ${product._id}€</p>
                  <a href="/dashboard/${product._id}/edit">Editar</a>
              </div>
          `;
      });

      productCards += '</div>';

      const html = htmlDashboard(productCards) ;
      res.send(html);
  } catch (error) {
      res.status(500).send('Error al cargar el dashboard');
  }

},


  showEditProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      const htmlForm = editProductView(product);

      res.send(htmlForm);
    } catch (error) {
      res.status(500).send('Error al cargar el producto: ' + error.message);
    }
  },

  
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

      if (!updatedProduct) {
        return res.status(404).send('Producto no encontrado');
      }

      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).send('Error al actualizar el producto: ' + error.message);
    }
  },

  
  showProductsByCategory: async (req, res) => {
      const { HOST, PORT } = process.env;
      const { category } = req.params;
  
      try {
        const products = await Product.find({ categoria: category });
  
        let htmlContent = htmlCategory(category);
  
        products.forEach(product => {
          htmlContent += `
            <li>
              <img src="http://${HOST}:${PORT}/public/images/${product.imagen}" alt="${product.nombre}">
              <h2>${product.nombre}</h2>
              <p>${product.descripcion}</p>
              <p>Precio: $${product.precio.toFixed(2)}</p>
              <a href="/products/${product._id}">Ver detalles</a>
            </li>
          `;
        });

        htmlContent += `
            </ul>
          </body>
          </html>
        `;
  
        res.send(htmlContent);
      } catch (error) {
        res.status(500).json({ message: 'Error al cargar los productos por categoría', error: error.message });
      }
    }
}


module.exports = ProductController;




