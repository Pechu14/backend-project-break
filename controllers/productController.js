const multer = require('multer');
const path = require('path');
const Product = require('../models/Product'); // Asegúrate de que el modelo está importado

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
    const htmlForm = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crear un producto nuevo</title>
      </head>
      <body>
          <form id="productForm" onsubmit="submitForm(event)">
            <!-- Nombre del Producto -->
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" maxlength="100" required>
            <br><br>

            <!-- Descripción del Producto -->
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" maxlength="300" required></textarea>
            <br><br>

            <!-- Imagen del Producto -->
            <label for="imagen">Imagen:</label>
            <input type="file" id="imagen" name="imagen" accept="image/*">
            <br><br>

            <!-- Categoría del Producto -->
            <label for="categoria">Categoría:</label>
            <select id="categoria" name="categoria" required>
              <option value="Camisetas">Camisetas</option>
              <option value="Pantalones">Pantalones</option>
              <option value="Zapatos">Zapatos</option>
              <option value="Accesorios">Accesorios</option>
            </select>
            <br><br>

            <!-- Talla del Producto -->
            <label for="talla">Talla:</label>
            <select id="talla" name="talla" required>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <br><br>

            <!-- Precio del Producto -->
            <label for="precio">Precio:</label>
            <input type="number" id="precio" name="precio" step="0.01" min="0" required>
            <br><br>

            <!-- Botón de enviar -->
            <button type="submit">Subir Producto</button>
          </form>

          <!-- JavaScript embebido para manejar la solicitud del formulario -->
          <script>
            function submitForm(event) {
              event.preventDefault(); // Evitar el envío tradicional del formulario
              // Obtener los valores de los inputs
              const nuevonombre = document.getElementById('nombre').value;
              const nuevadescripcion = document.getElementById('descripcion').value;
              const nuevacategoria = document.getElementById('categoria').value;
              const nuevatalla = document.getElementById('talla').value;
              const nuevoprecio = document.getElementById('precio').value;

              // Obtener la imagen (opcional)
              const imagenInput = document.getElementById('imagen');
              const imagen = imagenInput.files[0]; // Solo se permite seleccionar un archivo

              // Crear el objeto del producto
              const data = {
                nombre: nuevonombre,
                descripcion: nuevadescripcion,
                categoria: nuevacategoria,
                talla: nuevatalla,
                precio: +nuevoprecio
              }
                
              if (imagen) {
                //formData.append('imagen', imagen); // Adjuntar la imagen solo si se ha seleccionado
              }

              // Hacer la petición HTTP con fetch
              fetch('/dashboard', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json', // Tipo de contenido enviado
                },
                body: JSON.stringify(data), // Enviamos el FormData que contiene los datos y la imagen
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Error en la solicitud');
                }
                return response.json(); // O puedes redirigir o hacer otra cosa con la respuesta
              })
              .then(data => {
                console.log('Producto creado:', data);
                alert('Producto creado con éxito');
              })
              .catch(error => {
                console.error('Error:', error);
                alert('Error al crear el producto');
              });
            }
          </script>

      </body>
      </html>
    `;
    
    res.send(htmlForm);
  },

  // Para crear el producto con POST
  create: async (req, res) => {
    try {
      const { nombre, descripcion, categoria, talla, precio } = req.body;
      let imagen = null;

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

      // Crear la barra de navegación con categorías
      const navBar = `
        <nav>
          <ul>
            <li><a href="/products?category=Camisetas">Camisetas</a></li>
            <li><a href="/products?category=Pantalones">Pantalones</a></li>
            <li><a href="/products?category=Zapatos">Zapatos</a></li>
            <li><a href="/products?category=Accesorios">Accesorios</a></li>
            ${req.url === '/dashboard' ? '<li><a href="/dashboard/create">Subir Producto</a></li>' : ''}
          </ul>
        </nav>
      `;

      // Crear la vista HTML de todos los productos con enlaces a sus detalles
      let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Listado de Productos</title>
          <style>
            nav ul {
              list-style-type: none;
              padding: 0;
              display: flex;
              gap: 15px;
            }
            nav ul li {
              display: inline;
            }
            nav ul li a {
              text-decoration: none;
              color: blue;
              font-weight: bold;
            }
            .product-list {
              display: flex;
              flex-wrap: wrap;
            }
            .product-item {
              margin: 10px;
              border: 1px solid #ccc;
              padding: 10px;
              width: 200px;
            }
            .product-item img {
              max-width: 100%;
            }
          </style>
        </head>
        <body>
          ${navBar} <!-- Insertar la barra de navegación -->

          <h1>Productos Disponibles</h1>
          <div class="product-list">
      `;

      // Iterar sobre los productos y crear una tarjeta para cada uno con enlace a su detalle
      products.forEach(product => {
        html += `
          <div class="product-item">
            <h2>${product.nombre}</h2>
            <p>${product.descripcion}</p>
            <p>Precio: ${product.precio}€</p>
            <a href="/products/${product._id}">Ver detalle</a>
          </div>
        `;
      });

      // Cerrar la estructura HTML
      html += `
          </div>
        </body>
        </html>
      `;

      // Enviar la vista HTML como respuesta
      res.send(html);
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
          <img src="/images/${product.imagen}" alt="${product.nombre}">
          <p>${product.descripcion}</p>
          <p>Precio: ${product.precio}€</p>
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
                  <img src="/images/${product.imagen}" alt="${product.nombre}">
                  <h2>${product.nombre}</h2>
                  <p>${product.descripcion}</p>
                  <p>${product.precio}€</p>
                  <a href="/dashboard/${product._id}/edit">Editar</a>

                  <!-- Formulario para eliminar el producto -->
                  <form action="/dashboard/${product._id}/delete" method="POST">
                    <input type="hidden" name="_method" value="DELETE">
                    <button type="submit">Eliminar Producto</button>
                  </form>
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
  }
}




module.exports = ProductController;




