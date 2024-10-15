const multer = require('multer');
const path = require('path');
const Product = require('../models/Product'); // Asegúrate de que el modelo está importado
require('dotenv').config(); // Carga las variables de entorno desde .env


//Para los html
const createProductFormView = require('../views/createProductFormView.ts');
const productsListView = require('../views/productsListView.ts');
const editProductView = require('../views/editProductView.ts');
const htmlById = require('../views/productsByIdview.ts');
const htmlDashboard = require('../views/showDashboardView.ts');
const htmlCategory = require('../views/productsByCategory.ts');




// Configuración de multer para el manejo de archivos (imágenes)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada imagen
  }
});
const upload = multer({ storage });



const ProductController = {
  // Para traer el formulario, recoger los datos y crear el producto
  showNewProduct: async (req, res) => {
    const htmlForm = createProductFormView;
    
    res.send(htmlForm);
  },

  // Para crear el producto con POST
  createproduct: async (req, res) => {
    try {
      const { nombre, descripcion, categoria, talla, precio, imagen } = req.body;
     
      if (req.file) {
        imagen = req.file.filename; // El nombre del archivo de imagen subido
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
  // Método para mostrar todos los productos
  showProducts: async (req, res) => {
    const { HOST, PORT } = process.env;
    try {
      // Buscar todos los productos en la base de datos
      const products = await Product.find();
      let htmlShowProducts = productsListView;
      // Iterar sobre los productos y crear una tarjeta para cada uno con enlace a su detalle
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

      // Cerrar la estructura HTML
      htmlShowProducts += `
          </div>
        </body>
        </html>
      `;

      // Enviar la vista HTML como respuesta
      res.send(htmlShowProducts);
    } catch (error) {
      res.status(500).send('Error al cargar los productos: ' + error.message);
    }
  
  },

   // Método para mostrar el detalle de un producto por ID
   showProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      // Crear la vista HTML con el detalle del producto
      const html = htmlById(product)
      res.send(html);
    } catch (error) {
      res.status(500).send('Error al cargar el producto: ' + error.message);
    }
  },

  // Método para eliminar un producto
  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;

      // Buscar y eliminar el producto por su ID
      await Product.findByIdAndDelete(productId);

      // Redirigir al dashboard después de eliminar el producto
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error eliminando el producto:', error);
      res.status(500).send('Error al eliminar el producto');
    }
  },

  // Controlador para mostrar el dashboard con la lista de productos
showDashboard: async (req, res) => {
  const { HOST, PORT } = process.env;
  try {
      const products = await Product.find();
      let productCards = '<div class="product-list">';

      // Generar las tarjetas de productos con el formulario de eliminar
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

     // Mostrar el formulario de edición
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

     // Actualizar el producto
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

      if (!updatedProduct) {
        return res.status(404).send('Producto no encontrado');
      }

      // Redirigir al dashboard después de actualizar el producto
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).send('Error al actualizar el producto: ' + error.message);
    }
  },

  
    // Controlador para mostrar productos por categoría
    showProductsByCategory: async (req, res) => {
      const { HOST, PORT } = process.env;
      const { category } = req.params; // Obtener la categoría desde la URL
  
      try {
        // Buscar los productos que coincidan con la categoría
        const products = await Product.find({ categoria: category });
  
        // Generar el HTML directamente en el controlador
        let htmlContent = htmlCategory(category);
  
        // Iterar sobre los productos para añadirlos al HTML
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
  
        // Cerrar la lista y añadir enlace para volver
        htmlContent += `
            </ul>
          </body>
          </html>
        `;
  
        // Enviar el HTML generado como respuesta
        res.send(htmlContent);
      } catch (error) {
        // En caso de error, responder con un mensaje de error
        res.status(500).json({ message: 'Error al cargar los productos por categoría', error: error.message });
      }
    }
  }





module.exports = ProductController;




