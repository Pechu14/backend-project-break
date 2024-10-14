const multer = require('multer');
const path = require('path');
const Product = require('../models/Product'); // Asegúrate de que el modelo está importado
const createProductFormView = require('../views/createProductFormView.ts');
const productsListView = require('../views/productsListView.ts');

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
  getCreateProductFormView: async (req, res) => {
    const htmlForm = createProductFormView;
    
    res.send(htmlForm);
  },

  // Para crear el producto con POST
  create: async (req, res) => {
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
          message: 'There was a problem trying to create a product',
          error: error.message
        });
    }
  },
  // Método para mostrar todos los productos
  showProducts: async (req, res) => {
    try {
      // Buscar todos los productos en la base de datos
      const products = await Product.find();
      let htmlShowProducts = productsListView;
      // Iterar sobre los productos y crear una tarjeta para cada uno con enlace a su detalle
      products.forEach(product => {
        htmlShowProducts += `
          <div class="product-item">
            <img src="http://localhost:8080/public/images/${product.imagen}" alt="${product.nombre}">
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
      const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Detalle del Producto</title>
        </head>
        <body>
          <h1>${product.nombre}</h1>
          <img src="http://localhost:8080/public/images/${product.imagen}" alt="${product.nombre}">
          <p>${product.descripcion}</p>
          <p>Precio: ${product.precio}€</p>
          <p>ID: ${product._id}</p>
          <a href="/products">Volver al listado</a>
        </body>
        </html>
      `;

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
  try {
      const products = await Product.find();
      let productCards = '<div class="product-list">';

      // Generar las tarjetas de productos con el formulario de eliminar
      products.forEach(product => {
          productCards += `
              <div class="product-card">
                  <img src="http://localhost:8080/public/images/${product.imagen}" alt="${product.nombre}">
                  <h2>${product.nombre}</h2>
                  <p>${product.descripcion}</p>
                  <p>${product.precio}€</p>
                  <p>ID: ${product._id}€</p>
                  <a href="/dashboard/${product._id}/edit">Editar</a>
              </div>
          `;
      });

      productCards += '</div>';

      const html = `
          <!DOCTYPE html>
          <html lang="es">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Dashboard - Productos</title>
          </head>
          <body>
              <h1>Dashboard de Productos</h1>
              <nav>
                <a href="/products/categoria/Camisetas">Camisetas</a>
                <a href="/products/categoria/Pantalones">Pantalones</a>
                <a href="/products/categoria/Zapatos">Zapatos</a>
                <a href="/products/categoria/Accesorios">Accesorios</a>
                <a href="/dashboard">Dashboard</a></li>
                <a href="/dashboard/new">Subir Producto</a>
              </nav>
              ${productCards}
          </body>
          </html>
      `;
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

      const htmlForm = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Editar Producto</title>
      </head>
      <body>
          <form action="/dashboard/${product._id}?_method=PUT" method="POST">
            <!-- Nombre del Producto -->
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value="${product.nombre}" maxlength="100" required>
            <br><br>

            <!-- Descripción del Producto -->
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" maxlength="300" required>${product.descripcion}</textarea>
            <br><br>

            <!-- Categoría del Producto -->
            <label for="categoria">Categoría:</label>
            <select id="categoria" name="categoria" required>
              <option value="Camisetas" ${product.categoria === "Camisetas" ? "selected" : ""}>Camisetas</option>
              <option value="Pantalones" ${product.categoria === "Pantalones" ? "selected" : ""}>Pantalones</option>
              <option value="Zapatos" ${product.categoria === "Zapatos" ? "selected" : ""}>Zapatos</option>
              <option value="Accesorios" ${product.categoria === "Accesorios" ? "selected" : ""}>Accesorios</option>
            </select>
            <br><br>

            <!-- Talla del Producto -->
            <label for="talla">Talla:</label>
            <select id="talla" name="talla" required>
              <option value="XS" ${product.talla === "XS" ? "selected" : ""}>XS</option>
              <option value="S" ${product.talla === "S" ? "selected" : ""}>S</option>
              <option value="M" ${product.talla === "M" ? "selected" : ""}>M</option>
              <option value="L" ${product.talla === "L" ? "selected" : ""}>L</option>
              <option value="XL" ${product.talla === "XL" ? "selected" : ""}>XL</option>
            </select>
            <br><br>

            <!-- Precio del Producto -->
            <label for="precio">Precio:</label>
            <input type="number" id="precio" name="precio" value="${product.precio}" step="0.01" min="0" required>
            <br><br>

            <!-- Botón de enviar -->
            <button type="submit">Actualizar Producto</button>
          </form>

            <!-- Formulario para eliminar el producto -->
                  <form action="/dashboard/${product._id}/delete" method="POST">
                    <input type="hidden" name="_method" value="DELETE">
                    <button type="submit">Eliminar Producto</button>
                  </form>
          
          <a href="/dashboard">Volver al dashboard</a>
      </body>
      </html>
      `;

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
      const { category } = req.params; // Obtener la categoría desde la URL
  
      try {
        // Buscar los productos que coincidan con la categoría
        const products = await Product.find({ categoria: category });
  
        // Generar el HTML directamente en el controlador
        let htmlContent = `
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Productos en la categoría ${category}</title>
          </head>
          <body>
            <nav>
              <a href="/products">Volver a /products</a>
              <a href="/products/categoria/Camisetas">Camisetas</a>
              <a href="/products/categoria/Pantalones">Pantalones</a>
              <a href="/products/categoria/Zapatos">Zapatos</a>
              <a href="/products/categoria/Accesorios">Accesorios</a>
              <a href="/dashboard">Dashboard</a></li>
              <a href="/dashboard/new">Subir Producto</a>
            </nav>
            <h1>Productos en la categoría: ${category}</h1>
            <ul>`;
  
        // Iterar sobre los productos para añadirlos al HTML
        products.forEach(product => {
          htmlContent += `
            <li>
              <img src="http://localhost:8080/public/images/${product.imagen}" alt="${product.nombre}">
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




